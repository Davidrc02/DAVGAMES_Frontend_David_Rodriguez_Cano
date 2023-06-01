import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TendenciasRoutingModule } from './tendencias-routing.module';
import { TendenciasComponent } from './tendencias.component';


@NgModule({
  declarations: [
  TendenciasComponent
],
  imports: [
    CommonModule,
    TendenciasRoutingModule
  ],
  exports:[
    TendenciasComponent
  ]
})
export class TendenciasModule { }
