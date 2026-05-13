import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Reservacion } from '../../interfaces/reservacion';
import { ReserveService } from '../../services/reserve-service';

@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservas.html',
  styleUrl: './admin-reservas.css',
})
export class AdminReservas {
  resrvServ = inject(ReserveService);
  resrv = computed(() => this.resrvServ.allReserves()); 

  constructor() {
    this.resrvServ.fetchAllReservas();
  }

  eliminarReserva(id: any) {
    if(confirm('¿Estás seguro de que deseas eliminar esta reservación?')) {
      this.resrvServ.deleteReserva(id);
      console.log(`Reserva ${id} eliminada`);
    }
  }

  cancelarReserva(id: any){
    this.resrvServ.cancelarReserva(id);
  }
}
