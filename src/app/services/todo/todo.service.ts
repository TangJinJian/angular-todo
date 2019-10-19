import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    private localStorage: LocalStorageService,
    private router: Router
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
    return this.http
      .post<CreatedTodo>(this.api('todos'), createdTodoDto, this.authHeader())
      .pipe(catchError(this.handleError<CreatedTodo>({ _id: '' })));
  }

  // tslint:disable-next-line: variable-name
  patchTodo(_id: string, updatedTodo: UpdateTodoDto): Observable<void> {
    return this.http
      .patch<void>(this.api(`todos/${_id}`), updatedTodo, this.authHeader())
      .pipe(catchError(this.handleError<void>()));
  }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.api('todos'), this.authHeader())
      .pipe(catchError(this.handleError<Todo[]>([])));
  }

  // tslint:disable-next-line: variable-name
  deleteTodo(_id: string): Observable<void> {
    return this.http
      .delete<void>(this.api(`todos/${_id}`), this.authHeader())
      .pipe(catchError(this.handleError<void>()));
  }

  private toLogin(): void {
    this.router.navigateByUrl('/login');
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      if (401 === error.status) {
        this.toLogin();
      }

      // TODO: 发送日志到远程服务器，让其记录下来。
      console.error(error); // log to console instead

      // 通过返回一个空结果让应用程序继续运行。
      return of(result as T);
    };
  }
}
