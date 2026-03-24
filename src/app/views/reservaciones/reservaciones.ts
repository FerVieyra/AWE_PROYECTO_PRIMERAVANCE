import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-reservaciones',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './reservaciones.html',
  styleUrl: './reservaciones.css',
})
export class Reservaciones {
  usuarioPlaceholder: string = 'fer';
  fechaMinima: string = '';

  constructor() {
    this.calcularFechaMinima();
  }

  calcularFechaMinima() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 2);

    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    
    this.fechaMinima = `${año}-${mes}-${dia}`;
  }
  
  reserva = {
    cantidadPersonas: null,
    fecha: '',
    hora: ''
  };

  agendar() {
    if (this.reserva.fecha < this.fechaMinima) {
      alert('Las reservaciones deben hacerse con al menos 2 días de antelación.');
      return;
    }
    console.log('Datos de la reserva:', this.reserva);
    alert('Reserva solicitada correctamente');
  }
}
