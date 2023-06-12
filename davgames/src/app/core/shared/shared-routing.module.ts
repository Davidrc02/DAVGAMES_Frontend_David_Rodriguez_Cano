import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  {path: "", redirectTo:"/", pathMatch:"full"},
  {path: "videojuegos", redirectTo:"/videojuegos", pathMatch:"full"},
  {path: "pago", component: PagoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
