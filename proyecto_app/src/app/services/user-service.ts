import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);
  private _user = signal<User | null>(null);
  public user = this._user.asReadonly();

  private _users = signal<User[] | null>([]);
  public users = this._users.asReadonly();

  getUser(){ 
    this.isLoading.set(true);
    this.http.get<User>('http://localhost:8081/api/usuario/get').subscribe({
      next: (response: any) => {
        this._user.set(response);
        this.user = this._user.asReadonly();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () =>{
        this.isLoading.set(false);
      }
    })
  }

  updateCurrUser(nombre: string, apellidos: string, direccion: string, email: string, password: string){
    this.isLoading.set(true);

    this.http.put<User>('http://localhost:8081/api/usuario/update', 
      {nombre, apellidos, direccion, email, password}).subscribe({
        next: (response: User) => {
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

  getAllUsers(){
    this.http.get<User[]>('http://localhost:8081/api/usuario/getAll').subscribe({
      next: (response: User[]) => {
        this._users.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  changeRole(email: string){
    this.isLoading.set(true);

    this.http.patch<any>('http://localhost:8081/api/usuario/cambiarRol', 
      {email}).subscribe({
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

  deleteUser(email: string){
    this.isLoading.set(true);
    const opciones = {
      body: { email: email}
    }

    this.http.delete<any>('http://localhost:8081/api/usuario/delete', 
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
