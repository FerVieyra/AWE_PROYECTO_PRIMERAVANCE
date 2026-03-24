import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-editar-platillo',
  imports: [
    CommonModule,
    FormsModule,
    Header,
    RouterLink
],
  templateUrl: './editar-platillo.html',
  styleUrl: './editar-platillo.css',
})
export class EditarPlatillo {
  platillo = {
    nombre: 'Lasagna',
    descripcion: 'Una lasagna.',
    precio: 514.23,
    imagenUrl: 'assets/lasagna.jpg'
  };

  actualizarPlatillo() {
    console.log('Datos actualizados:', this.platillo);
    alert('Platillo actualizado con éxito');
  }

  cancelar() {
    console.log('Edición cancelada');
  }
}
