import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservas.html',
  styleUrl: './admin-reservas.css',
})
export class AdminReservas {
  // Lista placeholder de reservaciones
  reservas = [
    { 
      id: 101, 
      usuario: 'Admin Toor', 
      fecha: '2025-11-30', 
      hora: '02:41:00', 
      personas: 12, 
      estado: 'Confirmada' 
    },
    { 
      id: 102, 
      usuario: 'Juan Pérez', 
      fecha: '2025-12-05', 
      hora: '14:30:00', 
      personas: 4, 
      estado: 'Completada' 
    }
  ];

  eliminarReserva(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar esta reservación?')) {
      this.reservas = this.reservas.filter(r => r.id !== id);
      console.log(`Reserva ${id} eliminada`);
    }
  }
}
