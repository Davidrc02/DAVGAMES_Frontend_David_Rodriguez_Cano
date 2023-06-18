import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisFacturasComponent } from './mis-facturas/mis-facturas.component';

const routes: Routes = [
  {
    path: "",
    component: PerfilComponent,
    children: [
      { path: ":usuario", component: MiPerfilComponent },
      { path: ":usuario/facturas", component: MisFacturasComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
