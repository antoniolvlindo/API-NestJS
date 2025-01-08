import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface } from '../interfaces';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true})
  email: string;

  @Column({ default: true})
  active: boolean
}
