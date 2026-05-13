import { Component, inject, signal, effect, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { ReserveService } from '../../services/reserve-service';
import { PedidosService } from '../../services/pedidos-service';
import { Reservacion } from '../../interfaces/reservacion';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, Header, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil{
  isLoading = signal(false);
  private cd = inject(ChangeDetectorRef);

  auth = inject(AuthService);
  userService = inject(UserService);
  reserveService = inject(ReserveService);
  pedidoService = inject(PedidosService);

  userInfo = computed(() => this.userService.user());
  reserves = computed(() => {
    const user = this.userInfo();
    const data = this.reserveService.reserves();
    return (user && data) ? data : [];
  });

  peds = computed(() => {
    const user = this.userInfo();
    const data = this.pedidoService.pedidos();
    return (user && data) ? data : [];
  });

  pedidos: any[] = [];

  constructor()
  {
    this.userService.getUser();
    this.reserveService.getReservacionesUsuario();
    this.pedidoService.getPedidosUsuario();

    effect(() => {

      if (this.reserves().length > 0) {
        this.cd.detectChanges(); 
      }
    });
  }
  
  cancelarReserva(reservaId: any)
  {
    this.reserveService.cancelarReserva(reservaId);
  }

  cancelarPedido(pedidoId: any)
  {
    this.pedidoService.cancelarPedido(pedidoId);
  }
}
