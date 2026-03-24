import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login{
  credenciales = {
    correo: '',
    password: ''
  };

  onLogin() {
    console.log('Intento de inicio de sesión:', this.credenciales);
  }
}