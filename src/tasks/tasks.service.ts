import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { ITask, TaskStatus } from './task.enum';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getALLTask(): Promise<ITask[]> {
    const allTask = await this.tasksRepository.find({
      relations: ['user'],
      select: ['user'],
      join: {
        alias: 'user',
        innerJoinAndSelect: { ugg: 'user', u: 'user' },
      },
    });
    return allTask;
  }
  async getTaskById(idTask: string): Promise<ITask> {
    const foundTask = await this.tasksRepository.findOne(idTask);
    if (!foundTask) {
      throw new NotFoundException();
    }
    return foundTask;
  }
  async createTask(createTaskDTO: CreateTaskDTO, user): Promise<ITask> {
    const { title, descriptions } = createTaskDTO;
    const newTask = this.tasksRepository.create({
      title,
      descriptions,
      status: TaskStatus.OPEN,
      user,
    });
    await this.tasksRepository.save(newTask);
    return newTask;
  }
  async deleteTask(idTask: string): Promise<DeleteResult> {
    const foundTask = await this.tasksRepository.findOne(idTask);
    if (!foundTask) {
      throw new NotFoundException();
    }
    const deleteTask = await this.tasksRepository.delete(idTask);
    return deleteTask;
  }
}
