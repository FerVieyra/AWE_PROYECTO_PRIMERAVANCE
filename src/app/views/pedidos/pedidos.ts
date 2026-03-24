import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos {
  cantidadCarrito: number = 0;

  platillos = [
    { id: 1, nombre: 'Lasagna', descripcion: 'Una lasagna.', precio: 514.23, imagen: 'assets/lasagna.jpg', cantidadSeleccionada: 1 },
    { id: 2, nombre: 'Pasta', descripcion: 'Un platillo de pasta con ingredientes italianos.', precio: 513.26, imagen: 'assets/pasta.jpg', cantidadSeleccionada: 1 },
    { id: 3, nombre: 'Platillo 3', descripcion: 'Es el tercer platillo.', precio: 14563.21, imagen: 'assets/lasagna.jpg', cantidadSeleccionada: 1 }
  ];

  agregarAlCarrito(platillo: any) {
    this.cantidadCarrito += platillo.cantidadSeleccionada;
    console.log(`Platillo añadido`);
    alert(`${platillo.nombre} añadido al carrito.`);
  }
}
