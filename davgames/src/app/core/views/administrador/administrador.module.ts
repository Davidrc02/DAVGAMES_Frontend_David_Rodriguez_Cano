import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../../shared/shared.module';
import { FacturasComponent } from './facturas/facturas.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    VideojuegosComponent,
    UsuariosComponent,
    FacturasComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdministradorModule { }
