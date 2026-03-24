import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-agregar-platillo',
  imports: [
    CommonModule,
    FormsModule,
    Header,
    RouterLink
],
  templateUrl: './agregar-platillo.html',
  styleUrl: './agregar-platillo.css',
})
export class AgregarPlatillo {
  nuevoPlatillo = {
    nombre: '',
    descripcion: '',
    precio: null,
    imagen: null
  };

  guardarPlatillo() {
    if (!this.nuevoPlatillo.nombre || !this.nuevoPlatillo.precio) {
      alert('Por favor, llena los campos obligatorios (Nombre y Precio).');
      return;
    }
    
    console.log('Nuevo platillo a registrar:', this.nuevoPlatillo);
    alert('Platillo guardado exitosamente en el menú.');
  }

  cancelar() {
    window.history.back();
  }
}
