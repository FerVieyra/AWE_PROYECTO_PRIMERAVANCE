import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { ReserveService } from '../../services/reserve-service';

@Component({
  selector: 'app-reservaciones',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './reservaciones.html',
  styleUrl: './reservaciones.css',
})
export class Reservaciones {
  private reserveService = inject(ReserveService);

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
    personas: null,
    fecha: '',
    hora: ''
  };

  agendar() {
    if (this.reserva.fecha < this.fechaMinima) {
      alert('Las reservaciones deben hacerse con al menos 2 días de antelación.');
      return;
    }
    this.reserveService.makeReservation(this.reserva.personas!, this.reserva.fecha, this.reserva.hora);
  }
}
