import { User } from 'src/auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

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

  @OneToOne(() => User, user => user.profile)
  user: User;
  
}
