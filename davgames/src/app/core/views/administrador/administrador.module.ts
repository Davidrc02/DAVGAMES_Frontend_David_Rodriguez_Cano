import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../../shared/shared.module';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { CrearVideojuegoComponent } from './videojuegos-administrador/crear-videojuego/crear-videojuego.component';
import { EditarVideojuegoComponent } from './videojuegos-administrador/editar-videojuego/editar-videojuego.component';
import { VideojuegosAdministradorComponent } from './videojuegos-administrador/videojuegos-administrador.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CrearVideojuegoComponent,
    EditarVideojuegoComponent,
    VideojuegosAdministradorComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdministradorModule { }
