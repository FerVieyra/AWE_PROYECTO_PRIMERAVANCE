import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-usuarios',
  imports: [CommonModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  usuarios = [
    { id: 1, nombre: 'Ref aryeiv', correo: 'ref@gmail.com', rol: 'cliente' },
    { id: 2, nombre: 'Constantino Vieyra', correo: 'constantino@correo.com', rol: 'admin' },
    { id: 3, nombre: 'Juan Pérez', correo: 'juan@example.com', rol: 'cliente' }
  ];

  cambiarRol(usuario: any) {
    usuario.rol = usuario.rol === 'cliente' ? 'admin' : 'cliente';
    console.log(`Rol cambiado.`);
  }

  eliminarUsuario(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar a este usuario?')) {
      console.log(`Usuario con ID eliminado`);
    }
  }
}
