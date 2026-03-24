import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, Header, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario = {
    nombreCompleto: 'fer vieyra',
    correo: 'correo@correo.com',
    direccion: 'una dir'
  };

  reservaciones: any[] = [];
  pedidos: any[] = [];
}
