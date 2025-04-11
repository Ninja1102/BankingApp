import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FundModule } from './fund/fund.module';
import { AdminModule } from './admin/admin.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,         
      username: 'root',   
      password: 'root',
      database: 'banking_db',   
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    DashboardModule,
    FundModule,
    AdminModule,
    OtpModule,
  ],
})
export class AppModule {}
