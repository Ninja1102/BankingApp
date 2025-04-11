import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from '../otp/otp.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { Profile } from '../dashboard/entities/profile.entity'; // ✅ Import Profile entity
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountRequest } from 'src/admin/entities/account-request.entity';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, AccountRequest, CreateAccountRequestDto]), // ✅ Include Profile here
    JwtModule.register({
      secret: '101debad4ad6b28d2aa9bf57f109615fc8f9f12054e9a6184b13f0cb7b225dde!',
      signOptions: { expiresIn: '1h' },
    }),
    OtpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
