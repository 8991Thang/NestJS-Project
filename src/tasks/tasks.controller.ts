import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';
import { GetTaskFilter } from './dto/fliter-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask(@Query() getTaskFilter: GetTaskFilter): ITask[] {
    console.log('getTaskFilter : ', getTaskFilter);
    return this.tasksService.getALLTask(getTaskFilter);
  }
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): ITask {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getDetailTask(@Param('id') id: string): ITask {
    return this.tasksService.getDetailTask(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): any {
    return this.tasksService.deleteTask(id);
  }
}
