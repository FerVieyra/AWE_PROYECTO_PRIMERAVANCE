import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  imports: [CommonModule],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
})
export class AdminMenu {
  prodServ = inject(ProductoService);
  prods = computed(() => this.prodServ.prods());
  url = this.prodServ.URL_API;

  router = inject(Router);

  constructor(){
    this.prodServ.fetchProductos();
  }

  editarPlatillo(id: any) {
    console.log(`Editando platillo`);
    this.router.navigate(['/editar-platillo', id])
  }

  eliminarPlatillo(id: any) {
    if(confirm('¿Estás seguro de eliminar este platillo del menú?')) {
      this.prodServ.deleteProducto(id);
      console.log(`Platillo eliminado`);
    }
  }
}
