import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payee } from './entities/payee.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payee, Transaction])],
  controllers: [FundController],
  providers: [FundService],
})
export class FundModule {}
