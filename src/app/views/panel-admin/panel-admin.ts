import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { AdminMenu } from '../../components/admin-menu/admin-menu';
import { AdminPedidos } from '../../components/admin-pedidos/admin-pedidos';
import { AdminReservas } from '../../components/admin-reservas/admin-reservas';
import { AdminUsuarios } from '../../components/admin-usuarios/admin-usuarios';

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule, Header, AdminMenu, AdminPedidos, AdminReservas, AdminUsuarios],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {
  
}
