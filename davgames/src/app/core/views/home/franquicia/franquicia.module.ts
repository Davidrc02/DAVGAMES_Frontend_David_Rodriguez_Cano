import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranquiciaRoutingModule } from './franquicia-routing.module';
import { FranquiciaComponent } from './franquicia.component';


@NgModule({
  declarations: [
    FranquiciaComponent
  ],
  imports: [
    CommonModule,
    FranquiciaRoutingModule
  ],
  exports:[
    FranquiciaComponent
  ]
})
export class FranquiciaModule { }
