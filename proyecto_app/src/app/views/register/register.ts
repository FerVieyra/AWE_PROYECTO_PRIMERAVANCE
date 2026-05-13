import { Component, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  authService = inject(AuthService);

  nuevoUsuario = {
    nombres: '',
    apellidos: '',
    direccion: '',
    correo: '',
    password: '',
    confirmarPassword: ''
  };

  onRegistro() {
    if (this.nuevoUsuario.password.length < 12) {
      alert('La contraseña debe tener al menos 12 caracteres.');
      return;
    }
    if (this.nuevoUsuario.password !== this.nuevoUsuario.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    
    this.authService.register(
      this.nuevoUsuario.nombres!,
      this.nuevoUsuario.apellidos!,
      this.nuevoUsuario.direccion!,
      this.nuevoUsuario.correo!,
      this.nuevoUsuario.password!
    );
  } 
}
