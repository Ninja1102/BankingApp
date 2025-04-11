import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: string;

  @Column()
  password: string;

  @Column()
  transactionPassword: string;

  @Column({ default: 0 })
  loginAttempts: number;

  @Column({ default: false })
  isAccountLocked: boolean;

  @Column()
  accountNumber: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({ default: 'USER' })
  role: 'USER' | 'ADMIN';
}
