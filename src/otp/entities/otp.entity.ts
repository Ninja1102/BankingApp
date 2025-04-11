import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string; // userId or account number

  @Column()
  otpCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
