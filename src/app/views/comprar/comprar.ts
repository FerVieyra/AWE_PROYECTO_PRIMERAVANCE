import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { CarritoService } from '../../services/carrito-service';
import { PedidosService } from '../../services/pedidos-service';

@Component({
  selector: 'app-comprar',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css',
})
export class Comprar {
  carritoService = inject(CarritoService);
  pedidoService = inject(PedidosService);
  carrito = this.carritoService.obtenerCarrito();

  pedido = [
    { nombre: 'Platillo 5', cantidad: 1, precio: 560.23 }
  ];

  total: number = this.carritoService.calcularTotal();

  pago = {
    titular: '',
    tarjeta: '',
    expiracion: '',
    cvv: '',
    direccionEnvio: ''
  };

  confirmarCompra() {
    if(!this.pago.titular || !this.pago.tarjeta || !this.pago.expiracion || !this.pago.cvv || !this.pago.direccionEnvio)
    {
      alert("compra fallida: faltan datos");
      return;
    }
    this.pedidoService.hacerPedido(this.total, this.pago.direccionEnvio);
  }
}
