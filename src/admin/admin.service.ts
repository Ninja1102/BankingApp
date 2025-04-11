import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Profile } from 'src/dashboard/entities/profile.entity';
import { Repository, Not } from 'typeorm';
import { ApproveAccountDto } from './dto/approve-account.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async getPendingRequests() {
    return this.userRepo.find({
      where: { status: Not('APPROVED') },
      relations: ['profile'], // ✅ assumes a OneToOne mapping exists
    });
  }

  async updateRequest(dto: ApproveAccountDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    user.status = 'APPROVED';
    return await this.userRepo.save(user);
  }
}
