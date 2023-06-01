import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TendenciasComponent } from './tendencias/tendencias.component';
const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "videojuegos", redirectTo:"/videojuegos", pathMatch:"full"},
    {path:"videojuegos/:nombreVideojuego/:nombreConsola", redirectTo:"/videojuegos/:nombreVideojuego/:nombreConsola"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }