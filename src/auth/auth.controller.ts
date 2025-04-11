import { Body, Controller, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body) {
    return this.authService.register(body);
  }

  @Post('account-request')
  accountRequest(@Body() dto: CreateAccountRequestDto) {
    return this.authService.requestAccount(dto);
  }
  

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('forgot-userid')
  forgotUserId(@Body() body: { accountNumber: string }) {
    return this.authService.sendOtpForUserId(body.accountNumber);
  }

  @Post('verify-userid')
  verifyUserId(@Body() body: { accountNumber: string; otp: string }) {
    return this.authService.verifyOtpForUserId(body.accountNumber, body.otp);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: { userId: string }) {
    return this.authService.sendOtpForPasswordReset(body.userId);
  }

  @Post('reset-password')
  resetPassword(@Body() body: {
    userId: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.authService.resetPassword(body.userId, body.otp, body.newPassword, body.confirmPassword);
  }
}
