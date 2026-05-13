import { Component, inject, computed, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductoService } from '../../services/producto-service';

@Component({
  selector: 'app-editar-platillo',
  imports: [
    CommonModule,
    FormsModule,
    Header,
],
  templateUrl: './editar-platillo.html',
  styleUrl: './editar-platillo.css',
})
export class EditarPlatillo implements OnInit{
  prodServ = inject(ProductoService);
  prod = computed(() => this.prodServ.editProd());
  url = this.prodServ.URL_API;

  route = inject(ActivatedRoute);
  routerL = inject(Router);
  platillo = {
    nombre: '',
    descripcion: '',
    precio: undefined,
    imagenUrl: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.prodServ.fetchProducto(id);
  }

  actualizarPlatillo() {
    console.log('Datos actualizados:', this.platillo);
    this.prodServ.updateProducto(this.platillo.nombre, this.platillo.descripcion, this.platillo.precio, this.platillo.imagenUrl);
    this.routerL.navigate(['/panel-admin']);
  }

  cancelar() {
    console.log('Edición cancelada');
    this.routerL.navigate(['/panel-admin']);
  }
}
