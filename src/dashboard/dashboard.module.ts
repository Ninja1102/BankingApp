import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Profile } from './entities/profile.entity';
import { User } from '../auth/entities/user.entity'; // ✅ Import User entity
import { Transaction } from '../fund/entities/transaction.entity'; // ✅ Import Transaction entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User, Transaction]), // ✅ Register repositories here
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
