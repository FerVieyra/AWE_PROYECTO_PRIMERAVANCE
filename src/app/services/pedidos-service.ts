import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from './carrito-service';
import { Pedidos } from '../interfaces/pedidos';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private http = inject(HttpClient);
  private carritoService = inject(CarritoService);
    
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);
  private _pedidos = signal<Pedidos[]>([]);
  public pedidos = this._pedidos.asReadonly();

  private _allPedidos = signal<Pedidos[]>([]);
  public allPedidos = this._allPedidos.asReadonly();
  
  hacerPedido(total: number, direccion: string){
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.post<any>('http://localhost:8081/api/pedido/comprar',
      {total, direccion}).subscribe({
        next: (response: any) =>{
          alert('Compra completada!');
        },
        error: (error: any) =>{
          console.log(error);
          this.errorMessage.set("Error al procesar compra.");
        },
        complete: () =>{
          this.isLoading.set(false);
          this.carritoService.limpiarCarrito();
        }
      })
  }

  getPedidosUsuario(){
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.http.get<any>('http://localhost:8081/api/pedido/getPedidosFromEmail')
    .subscribe({
      next: (response: Pedidos[]) => {
        this._pedidos.set(response);
        this.pedidos = this._pedidos.asReadonly();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  cancelarPedido(_id: any)
  {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.patch('http://localhost:8081/api/pedido/cancelar', {_id}).subscribe({
      next: (response: any) => {
        alert('pedido cancelado');
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }

  getAllPedidos(){
    this.http.get<Pedidos[]>('http://localhost:8081/api/pedido/get').subscribe({
      next: (response: Pedidos[]) => {
        this._allPedidos.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  deletePedido(id: any)
  {
    this.isLoading.set(true);
    const opciones = {
      body: { _id: id}
    }
    this.http.delete<any>('http://localhost:8081/api/pedido/delete', 
      opciones).subscribe({
        next: (response: any) => {
          alert('Cambios guardados correctamente.');
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }
}
