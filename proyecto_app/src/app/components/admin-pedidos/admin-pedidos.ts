import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../services/pedidos-service';

@Component({
  selector: 'app-admin-pedidos',
  imports: [CommonModule],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.css',
})
export class AdminPedidos {
  pedServ = inject(PedidosService);
  peds = computed(() => this.pedServ.allPedidos());

  constructor() {
    this.pedServ.getAllPedidos();
  }

  eliminarPedido(id: any) {
    if(confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      this.pedServ.deletePedido(id);
      console.log(`Pedido eliminado`);
    }
  }

  cancelarPedido(id: any){
    console.log("wuat");
    this.pedServ.cancelarPedido(id);
  }
}
