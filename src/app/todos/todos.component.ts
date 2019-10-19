import { Component, OnInit } from '@angular/core';

import { Todo } from '../services/todo/interfaces/todo-response-body.interface';
import { TodoService } from '../services/todo/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  newTodo: string;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = [...todos];
    });
  }

  addTodo(todo: string): void {
    this.todoService.createTodo({ todo }).subscribe(createdTodo => {
      this.todos.push({
        _id: createdTodo._id,
        complete: false,
        todo
      });
    });
  }

  // tslint:disable-next-line: variable-name
  delete(_id: string, i: number): void {
    this.todoService.deleteTodo(_id).subscribe(() => {
      this.todos.splice(i, 1);
    });
  }

  modify(todo: Todo): void {
    this.todoService
      .patchTodo(todo._id, {
        complete: todo.complete = !todo.complete
      })
      .subscribe();
  }
}
