import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../auth/entities/user.entity';
import { Profile } from '../dashboard/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
