import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  usuarioPlaceholder: string = 'Fer';

  platillos = [
    { nombre: 'Lasagna', descripcion: 'Una lasagna clásica con carne.', precio: 514.23, imagen: 'https://via.placeholder.com/150' },
    { nombre: 'Pasta', descripcion: 'Un platillo de pasta con ingredientes italianos.', precio: 513.26, imagen: 'https://via.placeholder.com/150' },
    { nombre: 'Platillo 3', descripcion: 'Es el tercer platillo.', precio: 14563.21, imagen: 'https://via.placeholder.com/150' },
    { nombre: 'Otra pasta', descripcion: 'Pasta... pero diferente.', precio: 120.20, imagen: 'https://via.placeholder.com/150' },
    { nombre: 'Platillo 5', descripcion: 'Una descripción breve.', precio: 560.23, imagen: 'https://via.placeholder.com/150' }
  ];
}
