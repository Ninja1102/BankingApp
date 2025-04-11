import { Controller, Get, Put, Body, Req, UseGuards, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    const userId: number = req.user.userId;
    return this.dashboardService.getProfile(userId); // ✅ Call service here
  }

  @Put('profile')
  async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    const userId: number = req.user.userId;
    return this.dashboardService.updateProfile(userId, dto); // ✅ Call service here
  }

  @Get('summary')
  getSummary(@Req() req) {
    return this.dashboardService.getAccountSummary(req.user.userId);
  }

  @Get('statement')
  getStatement(@Req() req, @Query('from') from: string, @Query('to') to: string) {
    return this.dashboardService.getAccountStatement(req.user.userId, from, to);
  }

  @Put('change-password')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.dashboardService.changePassword(req.user.userId, dto);
  }
  
}
