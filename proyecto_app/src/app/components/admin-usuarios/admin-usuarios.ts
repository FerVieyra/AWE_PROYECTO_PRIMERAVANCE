import { Component, inject, computed} from '@angular/core';
import { CommonModule} from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-admin-usuarios',
  imports: [CommonModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  userServ = inject(UserService);
  users = computed(() => this.userServ.users());

  constructor(){
    this.userServ.getAllUsers();

  }

  cambiarRol(usuarioEmail: string) {
    this.userServ.changeRole(usuarioEmail);
    console.log(`Rol cambiado.`);
  }

  eliminarUsuario(email: string) {
    if(confirm('¿Estás seguro de que deseas eliminar a este usuario?')) {
      this.userServ.deleteUser(email);
      console.log(`Usuario con ID eliminado`);
    }
  }
}
