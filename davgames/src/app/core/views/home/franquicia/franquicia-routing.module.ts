import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo:"/" , pathMatch:"full"},
  {path:"videojuegos", redirectTo:"/videojuegos" , pathMatch:"full"},
  {path:"videojuegos/:nombreVideojuego/:nombreConsola", redirectTo:"/videojuegos/:nombreVideojuego/:nombreConsola"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranquiciaRoutingModule { }
