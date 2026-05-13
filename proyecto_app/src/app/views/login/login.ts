import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule, ReactiveFormsModule, Header, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login{
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onLogin() {
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!);
  }
}