import { genSalt, hash } from 'bcrypt';
import { SharePropEntity } from 'src/helper/sharePropEntity.helper';
import { Task } from 'src/tasks/task.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];
}
