import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './config/typeorm.config';
import { configValidatorDb } from './config/configDb.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidatorDb,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync(typeormConfig),
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
