import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carritoVisible: boolean = false;

  toggleCarrito() {
    this.carritoVisible = !this.carritoVisible;
  }
  
  constructor() { }
}
