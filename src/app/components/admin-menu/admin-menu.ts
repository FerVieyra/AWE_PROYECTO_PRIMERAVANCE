import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-menu',
  imports: [CommonModule],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
})
export class AdminMenu {
  platillos = [
    { id: 1, nombre: 'Lasagna', precio: 514.23, imagen: 'assets/lasagna.jpg' },
    { id: 2, nombre: 'Pasta Carbonara', precio: 320.00, imagen: 'assets/pasta.jpg' },
    { id: 3, nombre: 'Pizza Margherita', precio: 280.50, imagen: 'assets/lasagna.jpg' }
  ];

  editarPlatillo(id: number) {
    console.log(`Editando platillo`);
  }

  eliminarPlatillo(id: number) {
    if(confirm('¿Estás seguro de eliminar este platillo del menú?')) {
      this.platillos = this.platillos.filter(p => p.id !== id);
      console.log(`Platillo eliminado`);
    }
  }
}
