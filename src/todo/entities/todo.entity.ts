import { TodoStatus } from '../constant/todo.contants';

export class Todo {
  id: number;
  title: string;
  content: string;
  comment: string;
  status: TodoStatus;
}
