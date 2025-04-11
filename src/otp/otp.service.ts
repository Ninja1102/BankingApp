import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
  ) {}

  async generate(identifier: string): Promise<string> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = this.otpRepo.create({ identifier, otpCode });
    await this.otpRepo.save(otp);
    return otpCode;
  }

  async validate(identifier: string, code: string): Promise<boolean> {
    const record = await this.otpRepo.findOne({
      where: { identifier, otpCode: code },
      order: { createdAt: 'DESC' },
    });

    if (!record) return false;

    // Optionally: check OTP expiry (e.g., 5 mins)
    const isExpired = (new Date().getTime() - new Date(record.createdAt).getTime()) > 5 * 60 * 1000;
    return !isExpired;
  }
}
