import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UsersModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
