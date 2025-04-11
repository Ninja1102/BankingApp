import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApproveAccountDto } from './dto/approve-account.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('requests')
  getPendingRequests() {
    return this.adminService.getPendingRequests();
  }

  @Post('approve')
  updateRequest(@Body() dto: ApproveAccountDto) {
    return this.adminService.updateRequest(dto);
  }
}
