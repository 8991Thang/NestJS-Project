import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask } from './task.enum';
import { TasksService } from './tasks.service';
import { User } from '../auth/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask(): Promise<ITask[]> {
    return this.tasksService.getALLTask();
  }
  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<ITask> {
    return this.tasksService.createTask(createTaskDTO, user);
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
