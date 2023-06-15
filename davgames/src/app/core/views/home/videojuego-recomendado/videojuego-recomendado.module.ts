import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegoRecomendadoRoutingModule } from './videojuego-recomendado-routing.module';
import { VideojuegoRecomendadoComponent } from './videojuego-recomendado.component';


@NgModule({
  declarations: [
    VideojuegoRecomendadoComponent
  ],
  imports: [
    CommonModule,
    VideojuegoRecomendadoRoutingModule
  ],
  exports:[
    VideojuegoRecomendadoComponent
  ]
})
export class VideojuegoRecomendadoModule { }
