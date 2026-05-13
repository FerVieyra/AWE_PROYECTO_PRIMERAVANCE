import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-config-perfil',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './config-perfil.html',
  styleUrl: './config-perfil.css',
})
export class ConfigPerfil implements OnInit{
  userService = inject(UserService);
  usuario = this.userService.user;
  usuarioEdicion = {
    nombre: '',
    apellidos: '',
    direccion: '',
    correo: '',
    password: ''
  };

  ngOnInit(): void {
    this.userService.getUser();
  }


  guardarCambios() {
    if (this.usuarioEdicion.password.length < 12) {
      alert('La contraseña debe tener al menos 12 caracteres.');
      return;
    }
    
    this.userService.updateCurrUser(this.usuarioEdicion.nombre, this.usuarioEdicion.apellidos, this.usuarioEdicion.direccion,
                                    this.usuarioEdicion.correo, this.usuarioEdicion.password)
  }
}
