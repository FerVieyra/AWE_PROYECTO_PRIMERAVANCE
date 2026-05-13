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
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'reservaciones', component: Reservaciones, canActivate:[authGuard] },
    { path: 'realizar-pedido', component: Pedidos, canActivate:[authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'comprar', component: Comprar, canActivate:[authGuard] },
    { path: 'perfil', component: Perfil, canActivate:[authGuard] },
    { path: 'configurar-perfil', component: ConfigPerfil, canActivate:[authGuard] },
    { path: 'panel-admin', component: PanelAdmin, canActivate:[authGuard] },
    { path: 'editar-platillo/:id', component: EditarPlatillo, canActivate:[authGuard] },
    { path: 'agregar-platillo', component: AgregarPlatillo, canActivate:[authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
