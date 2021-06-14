import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/fliter-task.dto';
import { ITask, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];
  getALLTask(getTaskFilter: GetTaskFilter): ITask[] {
    return this.tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): ITask {
    const { title, descritions } = createTaskDTO;
    const newTask = {
      id: new Date().getTime().toString(),
      title,
      descritions,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getDetailTask(idTask: string): ITask | any {
    if (!idTask) return null;
    const findTask = this.tasks.find((task) => task.id.toString() === idTask);
    if (!findTask) {
      throw new NotFoundException(`Not found task ${idTask}`);
    }

    return findTask;
  }

  deleteTask(taskId: string): any {
    if (!taskId) return null;
    const findTask = this.tasks.find((task) => task.id.toString() === taskId);
    if (findTask) {
      const deleteTask = this.tasks.filter(
        (task) => task.id.toString() !== taskId,
      );
      this.tasks = deleteTask;
      return {
        message: 'Deleted Task Successfully!!',
      };
    }
    return null;
  }
}
