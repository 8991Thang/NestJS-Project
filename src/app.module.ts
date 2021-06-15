import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
