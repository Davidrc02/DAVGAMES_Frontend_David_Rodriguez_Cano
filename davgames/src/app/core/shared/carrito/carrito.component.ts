import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../interfaces/pedido';

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

  get pedidos() {
    return this.carritoService.pedidos;
  }

  verificarNumero(pedido:Pedido){
    var elemento: HTMLInputElement | null = document.getElementById("cantidad"+pedido.videojuego.nombreVideojuego+pedido.videojuego.nombreConsola) as HTMLInputElement;
    console.log(elemento.value)
    if(isNaN(parseFloat(elemento.value))){
      elemento.value='1'
    }
  }
}
