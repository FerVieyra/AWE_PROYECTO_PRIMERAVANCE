import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly STORAGE_KEY = 'carrito_cocina_italiana';

  guardarCarrito(productos: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productos));
  }

  obtenerCarrito(): any[] {
    const carrito = localStorage.getItem(this.STORAGE_KEY);
    return carrito ? JSON.parse(carrito) : [];
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  calcularTotal(): number {
    const productos = this.obtenerCarrito();
    return productos.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  }

  calcularIndividual(index: any){
    const productos = this.obtenerCarrito();
    const precioIndividualTotal = productos[index].precio * productos[index].cantidad;

    return precioIndividualTotal;
  }
}
