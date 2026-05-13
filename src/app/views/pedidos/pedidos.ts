import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";
import { ProductoService } from '../../services/producto-service';
import { CarritoService } from '../../services/carrito-service';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule, Header, RouterLink],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit{
  prodService = inject(ProductoService);
  carritoService = inject(CarritoService);
  productos = this.prodService.prods;
  url = this.prodService.URL_API;
  cantidadProd = new Array<number>(this.prodService.numProds);

  platillos = {
    nombre: '',
    cantidadSeleccionada: 0
  }

  agregarAlCarrito(platillo: any, aIndex: any) {
    let carrito = this.carritoService.obtenerCarrito();
    const index = carrito.findIndex(p => p._id === platillo._id);
    console.log(aIndex);
    if (index !== -1) {
      carrito[index].cantidad += this.cantidadProd[aIndex];
    } else {
      carrito.push({ ...platillo, cantidad: this.cantidadProd[aIndex] });
    }

    this.carritoService.guardarCarrito(carrito);
    alert(`${platillo.nombre} añadido al carrito`);
  }

  ngOnInit(): void {
    this.prodService.fetchProductos();
  }

  getTotalItems(): number{
    let carrito = this.carritoService.obtenerCarrito();
    let sum = 0;

    for(let i: number = 0; i < carrito.length; i++)
    {
      sum += carrito[i].cantidad;
    }
    return sum;
  }
}
