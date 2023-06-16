import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from '../../shared/shared.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisFacturasComponent } from './mis-facturas/mis-facturas.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PerfilComponent,
    MiPerfilComponent,
    MisFacturasComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[PerfilComponent]
})
export class PerfilModule { }
