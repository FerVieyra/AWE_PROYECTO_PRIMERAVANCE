import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);
  public URL_API = 'http://localhost:8081'
  private _prods = signal<Producto[]>([]);
  public prods = this._prods.asReadonly();
  public numProds = this.prods.length

  private _editProd = signal<Producto | null>(null);
  public editProd = this._editProd.asReadonly();

  agregarProducto(fd: FormData)
  {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.post<any>('http://localhost:8081/api/producto/agregar', 
      fd).subscribe({
        next: (response: any) =>{
          alert("Platillo guardado correctamente");
        },
        error: (error) => {
          console.log(error);
          this.errorMessage.set("Error al crear platillo.");
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  fetchProductos() {
    this.http.get<Producto[]>('http://localhost:8081/api/producto/get').subscribe({
      next: (response: Producto[]) => {
        this._prods.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  deleteProducto(id: any)
  {
    this.isLoading.set(true);
    const opciones = {
      body: { _id: id}
    }
    this.http.delete<any>('http://localhost:8081/api/producto/delete', 
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

  fetchProducto(id: any){
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.get<Producto>(`http://localhost:8081/api/producto/getById/${id}`).subscribe({
      next: (response: any) => {
        this._editProd.set(response);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }

  updateProducto(nombre: string | undefined, descripcion: string | undefined, precio: number | undefined, imagen: string | undefined)
  {
    if(nombre === '')
      nombre = this.editProd()?.nombre;

    if(descripcion === '')
      descripcion = this.editProd()?.descripcion;

    if(precio === undefined)
      precio = this.editProd()?.precio;

    if(imagen === '')
      imagen = this.editProd()?.imagen;

    const id = this.editProd()?._id;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.put('http://localhost:8081/api/producto/update',
      {id,nombre,descripcion,precio,imagen}).subscribe({
        next: (response: any) => {
          alert("cambios guardados");
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
