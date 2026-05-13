import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';
import { Reservacion } from '../interfaces/reservacion';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);
  private token = this.authService.getToken();

  private _reserves = signal<Reservacion[]>([]);
  public reserves = this._reserves.asReadonly();

  private _allReserves = signal<Reservacion[]>([]);
  public allReserves = this._allReserves.asReadonly();

  makeReservation(personas: number, fecha: string, hora: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.token = this.authService.getToken();

    this.http.post<any>('http://localhost:8081/api/reservacion/crear', 
      { personas, fecha, hora }).subscribe({
        next: (response: any) => {
          alert('Reserva solicitada correctamente');

        },
        error: (error) => {
          console.log(error);
          this.errorMessage.set('Error al solicitar la reserva. Por favor, inténtalo de nuevo.');
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  getReservacionesUsuario(){
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.get<any>('http://localhost:8081/api/reservacion/getReservesFromEmail')
    .subscribe({
      next: (response: Reservacion[]) => {
        this._reserves.set(response);
        this.reserves = this._reserves.asReadonly();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }

  cancelarReserva(_id: any)
  {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.patch('http://localhost:8081/api/reservacion/cancelar', {_id}).subscribe({
      next: (response: any) => {
        alert('Reserva cancelada');
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }

  fetchAllReservas(){
    this.http.get<Reservacion[]>('http://localhost:8081/api/reservacion/get').subscribe({
      next: (response: Reservacion[]) => {
        this._allReserves.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  deleteReserva(id: any)
  {
    this.isLoading.set(true);
    const opciones = {
      body: { _id: id}
    }
    this.http.delete<any>('http://localhost:8081/api/reservacion/delete', 
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
