import { User } from 'src/auth/user.entity';
import { SharePropEntity } from 'src/helper/sharePropEntity.helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.enum';

@Entity('task-db')
export class Task extends SharePropEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  descriptions: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User;
}
