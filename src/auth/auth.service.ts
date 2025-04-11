import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  
  import { User } from './entities/user.entity';
  import { Profile } from '../dashboard/entities/profile.entity';
  import { OtpService } from '../otp/otp.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      @InjectRepository(Profile) private profileRepo: Repository<Profile>,
      @InjectRepository(CreateAccountRequestDto) private accountRequestRepo: Repository<CreateAccountRequestDto>,
      private jwtService: JwtService,
      private otpService: OtpService,
    ) {}
  
    async register(dto: RegisterDto) {
      if (
        dto.password !== dto.confirmPassword ||
        dto.transactionPassword !== dto.confirmTransactionPassword
      ) {
        throw new BadRequestException('Passwords do not match');
      }
  
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const hashedTransPwd = await bcrypt.hash(dto.transactionPassword, 10);
  
      const user = this.userRepo.create({
        userId: dto.userId,
        password: hashedPassword,
        transactionPassword: hashedTransPwd,
        accountNumber: dto.accountNumber,
        email: dto.email,
        mobile: dto.mobile,
        role: 'USER',
      });
  
      const savedUser = await this.userRepo.save(user);
  
      const profile = this.profileRepo.create({
        userId: savedUser.id,
        name: '',
        dob: '',
        email: dto.email,
        mobile: dto.mobile,
        aadhar: '',
        address: '',
        occupation: '',
      });
  
      await this.profileRepo.save(profile);
  
      return { message: 'User and profile registered successfully' };
    }

    async requestAccount(dto: CreateAccountRequestDto) {
        const request = this.accountRequestRepo.create(dto);
        return await this.accountRequestRepo.save(request);
      }
      
  
    async login(dto: LoginDto) {
      const user = await this.userRepo.findOne({ where: { userId: dto.userId } });
      if (!user) throw new UnauthorizedException('Invalid credentials');
      if (user.isAccountLocked) throw new UnauthorizedException('Account is locked');
  
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 3) {
          user.isAccountLocked = true;
        }
        await this.userRepo.save(user);
        throw new UnauthorizedException('Invalid credentials');
      }
  
      user.loginAttempts = 0;
      await this.userRepo.save(user);
  
      const payload = {
        username: user.userId,
        sub: user.id,
        role: user.role,
      };
  
      const token = this.jwtService.sign(payload);
  
      return {
        message: 'Login successful',
        access_token: token,
      };
    }
  
    async sendOtpForUserId(accountNumber: string) {
      const user = await this.userRepo.findOne({ where: { accountNumber } });
      if (!user) throw new NotFoundException('Account not found');
  
      const otp = await this.otpService.generate(accountNumber);
      console.log('OTP for UserID recovery:', otp);
  
      return { message: 'OTP sent to registered email/mobile' };
    }
  
    async verifyOtpForUserId(accountNumber: string, otp: string) {
        const isValid = await this.otpService.validate(accountNumber, otp);
        if (!isValid) throw new UnauthorizedException('Invalid OTP');
      
        const user = await this.userRepo.findOne({ where: { accountNumber } });
        if (!user) throw new NotFoundException('User not found');
      
        return {
          userId: user.userId,
          message: 'User ID sent to email',
        };
      }      
  
    async sendOtpForPasswordReset(userId: string) {
      const user = await this.userRepo.findOne({ where: { userId } });
      if (!user) throw new NotFoundException('User not found');
  
      const otp = await this.otpService.generate(userId);
      console.log('OTP for password reset:', otp);
  
      return { message: 'OTP sent to registered email/mobile' };
    }
  
    async resetPassword(userId: string, otp: string, newPassword: string, confirmPassword: string) {
      if (newPassword !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
  
      const isValid = await this.otpService.validate(userId, otp);
      if (!isValid) throw new UnauthorizedException('Invalid or expired OTP');
  
      const user = await this.userRepo.findOne({ where: { userId } });
      if (!user) throw new NotFoundException('User not found');
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.loginAttempts = 0;
      user.isAccountLocked = false;
  
      await this.userRepo.save(user);
  
      return { message: 'Password successfully reset. You can now log in.' };
    }
  }
  