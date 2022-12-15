import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { register } from "../../models/auth";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    address: ['', Validators.required],
    phone_number: ['', Validators.required],
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

  register() {
    const user: register = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone_number: this.registerForm.value.phone_number,
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      address: this.registerForm.value.address
    }
    this.auth.register(user).subscribe( res => {
      localStorage.setItem('token', res.token)
      this.router.navigateByUrl('/login').then(r => r);
      this.alert.success('Usuario agregado exitosamente', 'Usuario');
      console.log(res);
    }, error => {
      console.log(error);
      this.alert.error('Error al agregar el usuario', 'Usuario');
    });
    this.registerForm.reset();
  }
}
