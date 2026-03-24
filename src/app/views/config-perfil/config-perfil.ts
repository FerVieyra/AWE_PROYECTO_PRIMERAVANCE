import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-config-perfil',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './config-perfil.html',
  styleUrl: './config-perfil.css',
})
export class ConfigPerfil {
  usuarioEdicion = {
    nombres: 'Juan',
    apellidos: 'Pérez García',
    direccion: 'Calle Italia #45, Col. Roma',
    correo: 'juanperez@example.com',
    password: 'password12345'
  };

  guardarCambios() {
    if (this.usuarioEdicion.password.length < 12) {
      alert('La contraseña debe tener al menos 12 caracteres.');
      return;
    }
    
    console.log('Información actualizada:', this.usuarioEdicion);
    alert('Información guardada correctamente.');
  }
}
