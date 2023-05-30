import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  declarations: [
    LogoComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    LogoComponent,
    CarritoComponent
  ]
})
export class SharedModule { }
