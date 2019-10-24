import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserCredential } from '../services/todo/interfaces/user-credential.interface';
import { TodoService } from '../services/todo/todo.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TOKEN } from '../services/local-storage/local-storage.namespace';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private localStorage: LocalStorageService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      account: '',
      password: ''
    } as UserCredential);
  }

  ngOnInit() {}

  onSubmit(userCredential: UserCredential) {
    this.todoService.getToken(userCredential).subscribe(responseBody => {
      this.todoService.token = responseBody.token;
      this.localStorage.set(TOKEN, responseBody.token);
      this.router.navigateByUrl('/');
    });
  }
}
