import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { ProductoService } from '../../services/producto-service';

@Component({
  selector: 'app-agregar-platillo',
  imports: [
    CommonModule,
    FormsModule,
    Header,
],
  templateUrl: './agregar-platillo.html',
  styleUrl: './agregar-platillo.css',
})
export class AgregarPlatillo {
  prodService = inject(ProductoService);
  nuevoPlatillo = {
    nombre: '',
    descripcion: '',
    precio: null,
    imagen: null
  };

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.nuevoPlatillo.imagen = file; // Aquí guardamos el archivo real, no un string
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarPlatillo() {
    if (!this.nuevoPlatillo.nombre || !this.nuevoPlatillo.precio) {
      alert('Por favor, llena los campos obligatorios (Nombre y Precio).');
      return;
    }

    const fd = new FormData();
    fd.append('nombre', this.nuevoPlatillo.nombre);
    fd.append('precio', this.nuevoPlatillo.precio);
    fd.append('descripcion', this.nuevoPlatillo.descripcion);
    fd.append('imagen', this.nuevoPlatillo.imagen!);
    
    console.log(fd);
    this.prodService.agregarProducto(fd);
  }

  cancelar() {
    window.history.back();
  }
}
