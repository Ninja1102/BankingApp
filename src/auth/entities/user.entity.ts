import { Profile } from 'src/dashboard/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

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

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 'PENDING' }) // or 'PENDING' if you prefer stricter flow
  status: 'PENDING' | 'APPROVED' | 'REJECTED';  

  @Column({ default: 'USER' })
  role: 'USER' | 'ADMIN';

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;
  
}
