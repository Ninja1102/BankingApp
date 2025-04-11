import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromAccount: string;

  @Column()
  toAccount: string;

  @Column()
  amount: number;

  @Column()
  mode: 'NEFT' | 'RTGS' | 'IMPS';

  @CreateDateColumn()
  createdAt: Date;
}
