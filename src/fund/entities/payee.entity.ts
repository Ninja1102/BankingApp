import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  accountNumber: string;

  @Column({ nullable: true })
  nickname: string;
}
