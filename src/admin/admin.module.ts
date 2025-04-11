import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRequest } from './entities/account-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRequest])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
