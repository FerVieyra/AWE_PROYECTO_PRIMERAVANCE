import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-pedidos',
  imports: [CommonModule],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.css',
})
export class AdminPedidos {
  pedidos = [
    { 
      id: 501, 
      usuario: 'Admin Toor', 
      total: 2569.21, 
      estado: 'Pendiente' 
    },
    { 
      id: 502, 
      usuario: 'Fer Vieyra', 
      total: 514.23, 
      estado: 'Entregado' 
    }
  ];

  eliminarPedido(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      console.log(`Pedido eliminado`);
    }
  }
}
