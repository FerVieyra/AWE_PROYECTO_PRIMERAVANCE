import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { RouterLink } from "@angular/router";
import { ProductoService } from '../../services/producto-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  prodService = inject(ProductoService);
  productos = this.prodService.prods;
  url = this.prodService.URL_API;

  ngOnInit(): void {
    this.prodService.fetchProductos();
  }
}
