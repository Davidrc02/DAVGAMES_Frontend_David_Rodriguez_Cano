import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AdministradorComponent,
    VideojuegosComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule
  ]
})
export class AdministradorModule { }
