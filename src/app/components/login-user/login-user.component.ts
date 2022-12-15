import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {login} from "../../models/auth";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alert: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    const user: login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.login(user).subscribe( res => {
      localStorage.setItem('token', res.message)
      this.router.navigateByUrl('/list_product').then(r => r);
    }, error => {
      console.log(error);
      this.alert.error(error.error.message, 'login');
    });
    this.loginForm.reset();
  }

  register() {

  }
}
