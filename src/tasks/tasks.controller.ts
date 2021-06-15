import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask } from './task.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTask(@Query() getTaskFilter: GetTaskFilter): ITask[] {
  //   console.log('getTaskFilter : ', getTaskFilter);
  //   return this.tasksService.getALLTask(getTaskFilter);
  // }
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<ITask> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getDetailTask(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): any {
    return this.tasksService.deleteTask(id);
  }
}
