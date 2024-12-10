import { TodoStatus } from '../constant/todo.contants';
export class CreateTodoDto {
  title: string;
  content: string;
  comment: string;
  status: TodoStatus;
}
