import { SharePropEntity } from 'src/helper/sharePropEntity.helper';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';

@Entity()
export class User extends SharePropEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
