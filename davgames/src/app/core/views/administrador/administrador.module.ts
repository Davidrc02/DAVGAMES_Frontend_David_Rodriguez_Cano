import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../../shared/shared.module';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { CrearVideojuegoComponent } from './videojuegos/crear-videojuego/crear-videojuego.component';
import { EditarVideojuegoComponent } from './videojuegos/editar-videojuego/editar-videojuego.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    VideojuegosComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CrearVideojuegoComponent,
    EditarVideojuegoComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdministradorModule { }
