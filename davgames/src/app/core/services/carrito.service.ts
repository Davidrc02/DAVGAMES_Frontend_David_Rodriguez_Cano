import { Injectable } from '@angular/core';
import { Factura } from '../interfaces/factura';
import { Carrito } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carritoVisible: boolean = false;
  carrito!: Carrito;

  toggleCarrito() {
    this.carritoVisible = !this.carritoVisible;
  }
  
  constructor() { }
}
