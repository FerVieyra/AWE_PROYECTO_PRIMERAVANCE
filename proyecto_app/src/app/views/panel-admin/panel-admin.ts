import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { AdminMenu } from '../../components/admin-menu/admin-menu';
import { AdminPedidos } from '../../components/admin-pedidos/admin-pedidos';
import { AdminReservas } from '../../components/admin-reservas/admin-reservas';
import { AdminUsuarios } from '../../components/admin-usuarios/admin-usuarios';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule, Header, AdminMenu, AdminPedidos, AdminReservas, AdminUsuarios, RouterLink],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {
  
}
