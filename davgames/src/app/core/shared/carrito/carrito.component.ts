import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {


  constructor(private carritoService: CarritoService){
  }

  toggleCarrito(){
    this.carritoService.toggleCarrito();
  }

  get carritoVisible() {
    return this.carritoService.carritoVisible;
  }

  get carrito() {
    return this.carritoService.carrito;
  }
}
