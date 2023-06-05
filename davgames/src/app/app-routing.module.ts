import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/views/login/login.component';
import { AdministradorModule } from './core/views/administrador/administrador.module';
import { RegistroComponent } from './core/views/registro/registro.component';
import { VideojuegosComponent } from './core/views/videojuegos/videojuegos.component';
import { VideojuegoComponent } from './core/views/videojuegos/videojuego/videojuego.component';

const routes: Routes = [
  
  {path: "", loadChildren: () => import("./core/views/home/home.module").then((m)=>m.HomeModule)},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegistroComponent},
  {path:"administrador", loadChildren: () => import("./core/views/administrador/administrador.module").then((m)=>m.AdministradorModule)},
  {path:"videojuegos", component: VideojuegosComponent},
  {path:"videojuegos/busqueda/:busqueda", component: VideojuegosComponent},
  {path:"videojuegos/:nombreVideojuego/:nombreConsola", component: VideojuegoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
