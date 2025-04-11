import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRequest } from './entities/account-request.entity';
import { Repository } from 'typeorm';
import { ApproveAccountDto } from './dto/approve-account.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AccountRequest)
    private requestRepo: Repository<AccountRequest>,
  ) {}

  async getPendingRequests() {
    return this.requestRepo.find({ where: { status: 'PENDING' } });
  }

  async updateRequest(dto: ApproveAccountDto) {
    const request = await this.requestRepo.findOne({ where: { id: dto.requestId } });
    if (!request) throw new NotFoundException('Request not found');

    if (dto.action === 'APPROVE') {
      request.status = 'APPROVED';
      request.accountNumber = this.generateAccountNumber();
    } else {
      request.status = 'REJECTED';
    }

    return this.requestRepo.save(request);
  }

  private generateAccountNumber(): string {
    return 'AC' + Math.floor(Math.random() * 10000000000); // Example format
  }
}
