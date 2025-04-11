import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
