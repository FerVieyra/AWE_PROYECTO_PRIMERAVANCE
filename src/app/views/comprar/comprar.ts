import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-comprar',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css',
})
export class Comprar {
  usuarioPlaceholder: string = 'fer';

  pedido = [
    { nombre: 'Platillo 5', cantidad: 1, precio: 560.23 }
  ];

  total: number = 560.23;

  pago = {
    titular: '',
    tarjeta: '',
    expiracion: '',
    cvv: '',
    direccionEnvio: ''
  };

  confirmarCompra() {
    console.log('Procesando pago para:', this.pago);
    alert('¡Compra completada');
  }
}
