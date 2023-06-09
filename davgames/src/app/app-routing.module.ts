import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/views/login/login.component';
import { AdministradorModule } from './core/views/administrador/administrador.module';
import { RegistroComponent } from './core/views/registro/registro.component';
import { VideojuegosComponent } from './core/views/videojuegos/videojuegos.component';
import { VideojuegoComponent } from './core/views/videojuegos/videojuego/videojuego.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { PerfilComponent } from './core/views/perfil/perfil.component';

const routes: Routes = [
  
  {path: "", loadChildren: () => import("./core/views/home/home.module").then((m)=>m.HomeModule)},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegistroComponent},
  {path:"administrador", loadChildren: () => import("./core/views/administrador/administrador.module").then((m)=>m.AdministradorModule), canActivate:[AuthGuard, AdminGuard]},
  {path:"videojuegos", component: VideojuegosComponent},
  {path:"videojuegos/:nombreVideojuego/:nombreConsola", component: VideojuegoComponent},
  {path:"perfil", loadChildren: () => import("./core/views/perfil/perfil.module").then((m)=>m.PerfilModule), canActivate:[AuthGuard]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
