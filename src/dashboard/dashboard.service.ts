import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/auth/entities/user.entity';

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
    const transactions = await this.transactionRepo.find({
      where: [{ fromAccount: user.accountNumber }, { toAccount: user.accountNumber }],
      order: { date: 'DESC' },
      take: 5,
    });
  
    return {
      accountNumber: user.accountNumber,
      balance: user.balance,
      recentTransactions: transactions,
    };
  }
  
}
