import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup | undefined;
  isLoadingBtn: boolean = false;
  isLoginFormSubmit = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.makeLoginForm();
  }

  makeLoginForm() {
    this.LoginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get loginFormSubmitted() {
    return this.LoginForm?.controls;
  }

  login() {
    const command = {
      email: this.LoginForm?.value.email,
      password: this.LoginForm?.value.password,
    }
    this.isLoadingBtn = true;
    if (this.LoginForm?.invalid) {
      this.isLoginFormSubmit = true;
      this.isLoadingBtn = false;
      return;
    }
    this.loginService.login(command)
      .pipe(finalize(() => this.isLoadingBtn = false))
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('userInfo', JSON.stringify(res.user));
          window.location.replace('/');
        }
      })

  }


}
