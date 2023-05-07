import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/views/home/home.component';
import { LoginComponent } from './core/views/login/login.component';
import { AdministradorModule } from './core/views/administrador/administrador.module';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"administrador", loadChildren: () => import("./core/views/administrador/administrador.module").then((m)=>m.AdministradorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
