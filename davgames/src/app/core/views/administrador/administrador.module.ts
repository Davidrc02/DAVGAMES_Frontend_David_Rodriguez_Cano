import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../../shared/shared.module';
import { FacturasComponent } from './facturas/facturas.component';


@NgModule({
  declarations: [
    AdministradorComponent,
    VideojuegosComponent,
    UsuariosComponent,
    FacturasComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule
  ]
})
export class AdministradorModule { }
