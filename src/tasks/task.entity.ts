import { SharePropEntity } from 'src/helper/sharePropEntity.helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.enum';

@Entity()
export class Task extends SharePropEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  descriptions: string;

  @Column()
  status: TaskStatus;
}
