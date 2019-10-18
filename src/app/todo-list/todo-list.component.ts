import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TOKEN } from '../services/local-storage/local-storage.namespace';
import { TodoService } from '../services/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private todoService: TodoService
  ) {
    // 如果没有登录，则跳转到登录页面
    if (!this.localStorage.get<string>(TOKEN)) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {}
}
