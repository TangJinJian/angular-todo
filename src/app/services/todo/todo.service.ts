import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserCredential } from './interfaces/user-credential.interface';
import {
  Token,
  Todo,
  CreatedTodo
} from './interfaces/todo-response-body.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TOKEN } from '../local-storage/local-storage.namespace';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // tslint:disable-next-line: variable-name
  private _token: string;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.get(TOKEN);
  }

  set token(token: string) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  private api(path: string): string {
    return '/api/' + path;
  }

  private authHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  getToken(userCredential: UserCredential): Observable<Token> {
    const loginHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...userCredential
      })
    };
    return this.http.get<Token>(this.api('auth/token'), loginHttpOptions);
  }

  createTodo(createdTodoDto: CreateTodoDto): Observable<CreatedTodo> {
    return this.http.post<CreatedTodo>(
      this.api('todos'),
      createdTodoDto,
      this.authHeader()
    );
  }

  // tslint:disable-next-line: variable-name
  patchTodo(_id: string, updatedTodo: UpdateTodoDto): Observable<object> {
    return this.http.patch<object>(
      this.api(`todos/${_id}`),
      updatedTodo,
      this.authHeader()
    );
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api('todos'), this.authHeader());
  }

  // tslint:disable-next-line: variable-name
  deleteTodo(_id: string): Observable<object> {
    return this.http.delete<object>(
      this.api(`todos/${_id}`),
      this.authHeader()
    );
  }
}
