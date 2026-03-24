import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
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
    console.log('Datos de registro:', this.nuevoUsuario);
    alert('Cuenta creada con éxito (Simulación)');
  } 
}
