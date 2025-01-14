import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { UserInterface } from '../interfaces';
import { createId } from '@paralleldrive/cuid2';

@Entity('users')
export class User implements UserInterface {
  @PrimaryColumn('varchar')
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

  @BeforeInsert()
  generateId() {
    this.id = createId();
  }
}
