import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'src/fund/entities/transaction.entity'; // your actual entity
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>, 
  ) {}

  async getProfile(userId: number) {
    return this.profileRepo.findOne({
      where: { userId}, // ✅ Fixed
    });
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const profile = await this.profileRepo.findOne({
      where: { userId}, // ✅ Fixed
    });

    if (!profile) throw new Error('Profile not found');

    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  async getAccountSummary(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const transactions = await this.transactionRepo.find({
      where: [{ fromAccount: user.accountNumber }, { toAccount: user.accountNumber }],
      order: { createdAt: 'DESC' },
      take: 5,
    });
  
    return {
      accountNumber: user.accountNumber,
      balance: user.balance,
      recentTransactions: transactions,
    };
  }

  async getAccountStatement(userId: number, from: string, to: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

  
    return await this.transactionRepo.find({
      where: {
        fromAccount: user.accountNumber,
        createdAt: Between(new Date(from), new Date(to)),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
      
    const isLoginMatch = await bcrypt.compare(dto.oldPassword, user.password);
    const isTxnMatch = await bcrypt.compare(dto.oldTransactionPassword, user.transactionPassword);
  
    if (!isLoginMatch || !isTxnMatch) {
      throw new UnauthorizedException('Old credentials incorrect');
    }
  
    if (dto.newPassword !== dto.confirmPassword || dto.newTransactionPassword !== dto.confirmTransactionPassword) {
      throw new BadRequestException('Passwords do not match');
    }
  
    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.transactionPassword = await bcrypt.hash(dto.newTransactionPassword, 10);
  
    return await this.userRepo.save(user);
  }  
  
}
