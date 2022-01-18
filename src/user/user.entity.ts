import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './dtos/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  date_birthday: string;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column()
  token: string;
}
