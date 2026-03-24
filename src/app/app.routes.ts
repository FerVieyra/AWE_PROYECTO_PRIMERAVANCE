import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Reservaciones } from './views/reservaciones/reservaciones';
import { Pedidos } from './views/pedidos/pedidos';
import { Login } from './views/login/login';
import { Register } from './views/register/register';
import { Comprar } from './views/comprar/comprar';
import { Perfil } from './views/perfil/perfil';
import { ConfigPerfil } from './views/config-perfil/config-perfil';
import { PanelAdmin } from './views/panel-admin/panel-admin';
import { EditarPlatillo } from './views/editar-platillo/editar-platillo';
import { AgregarPlatillo } from './views/agregar-platillo/agregar-platillo';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'reservaciones', component: Reservaciones },
    { path: 'realizar-pedido', component: Pedidos },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'comprar', component: Comprar },
    { path: 'perfil', component: Perfil },
    { path: 'configurar-perfil', component: ConfigPerfil },
    { path: 'panel-admin', component: PanelAdmin },
    { path: 'editar-platillo', component: EditarPlatillo },
    { path: 'agregar-platillo', component: AgregarPlatillo },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
