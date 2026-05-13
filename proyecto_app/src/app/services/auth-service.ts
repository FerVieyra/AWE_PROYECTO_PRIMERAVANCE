import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _token = signal<string | null>(null);

  public isLoggedIn = computed(() => !!this._token());
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);

  constructor(){
    if(typeof window !== 'undefined') {
      this._token.set(localStorage.getItem('token'));
    }
  }
  
  refreshToken(){
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
    }
  }

  getToken(){
    return this._token();
  }

  login(email: string, password: string){
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.post<any>('http://localhost:8081/api/auth/login',
      { email, password}).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this._token.set(response.token);
          this.router.navigate(['/home']);
        
        },
        error: (error) => {
          console.log(error);
          this.errorMessage.set(error.error.msg);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  register(nombre: string, apellidos: string, direccion: string, email: string, password: string){
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.post<any>('http://localhost:8081/api/auth/register',
      {nombre, apellidos, direccion, email, password}).subscribe({
        next: (response: any) => {
          alert('Registro exitoso. Por favor, inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          this.errorMessage.set(error.error.msg);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  logout(){
    if(typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this._token.set(null);
      this.router.navigate(['/login']);
    }
    
  }
}
