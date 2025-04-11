import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AccountRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  aadhar: string;

  @Column()
  address: string;

  @Column()
  occupation: string;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
