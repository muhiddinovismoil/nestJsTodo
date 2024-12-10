import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
const db_path = path.join(process.cwd(), 'src', 'database', 'todo.json');
@Injectable()
export class TodoService {
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const data = await fs.readFile(db_path, 'utf-8');
      const todos: Todo[] = JSON.parse(data);
      const id = todos.length + 1;
      const newTodo: Todo = { ...createTodoDto, id };
      todos.push(newTodo);
      await fs.writeFile(db_path, JSON.stringify(todos, null, 2));
      return newTodo;
    } catch (error) {
      console.error('Error in create method:', error);
      throw new Error('Could not create TODO');
    }
  }

  async findAll() {
    try {
      const data = await fs.readFile(db_path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error in get method:', error);
      throw new Error('Could not get TODO');
    }
  }

  async findOne(id: number) {
    try {
      const rawData = await fs.readFile(db_path, 'utf-8');
      const todos: Todo[] = JSON.parse(rawData);
      const filteredTodo = todos.filter((item) => item.id === id);
      if (filteredTodo.length == 0) {
        throw new Error(`Todo with id ${id} not found`);
      }
      return filteredTodo;
    } catch (error) {
      console.error('Error in get method:', error);
      throw new Error('Could not get TODO');
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const data = await fs.readFile(db_path, 'utf-8');
      const todos: Todo[] = JSON.parse(data);
      const index = todos.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error(`Todo with id ${id} not found`);
      }
      todos.splice(index, 1);
      const updatedTodo = { ...todos[index], ...updateTodoDto, id };
      todos.push(updatedTodo);
      await fs.writeFile(db_path, JSON.stringify(todos, null, 2));
      return updatedTodo;
    } catch (error) {
      console.error('Error in update method:', error);
      throw new Error('Could not update TODO');
    }
  }

  async remove(id: number) {
    try {
      const data = await fs.readFile(db_path, 'utf-8');
      const todos: Todo[] = JSON.parse(data);
      const index = todos.findIndex((item) => item.id === id);
      if (index == -1) {
        throw new Error(`Todo not found with this id: ${id}`);
      }
      const removedTodo = todos[index];
      todos.splice(index, 1);
      await fs.writeFile(db_path, JSON.stringify(todos));
      return removedTodo;
    } catch (error) {
      console.error('Error in delete method:', error);
      throw new Error('Could not delete TODO');
    }
  }
}
