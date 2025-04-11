import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { FundService } from './fund.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddPayeeDto } from './dto/add-payee.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('fund')
@UseGuards(JwtAuthGuard)
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Post('add-payee')
  addPayee(@Req() req, @Body() dto: AddPayeeDto) {
    return this.fundService.addPayee(req.user.userId, dto);
  }

  @Get('payees')
  getPayees(@Req() req) {
    return this.fundService.getPayees(req.user.userId);
  }

  @Post('transfer')
  transfer(@Req() req, @Body() dto: TransferDto) {
    return this.fundService.transferFunds(req.user.userId, dto);
  }
}
