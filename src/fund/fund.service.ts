import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payee } from './entities/payee.entity';
import { Repository } from 'typeorm';
import { AddPayeeDto } from './dto/add-payee.dto';
import { Transaction } from './entities/transaction.entity';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class FundService {
  constructor(
    @InjectRepository(Payee)
    private payeeRepo: Repository<Payee>,
    @InjectRepository(Transaction)
    private txnRepo: Repository<Transaction>,
  ) {}

  async addPayee(userId: string, dto: AddPayeeDto) {
    const payee = this.payeeRepo.create({ ...dto, userId });
    return this.payeeRepo.save(payee);
  }

  async getPayees(userId: string) {
    return this.payeeRepo.find({ where: { userId } });
  }

  async transferFunds(fromAccount: string, dto: TransferDto) {
    const txn = this.txnRepo.create({
      fromAccount,
      toAccount: dto.toAccount,
      amount: dto.amount,
      mode: dto.mode,
    });
    return this.txnRepo.save(txn);
  }
}
