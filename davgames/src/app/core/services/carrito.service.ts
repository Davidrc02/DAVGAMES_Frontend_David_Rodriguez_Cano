import { Injectable } from '@angular/core';
import { Factura } from '../interfaces/factura';
import { Carrito } from '../interfaces/carrito';
import { Pedido } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carritoVisible: boolean = false;
  pedidos: Pedido[]=[];

  toggleCarrito() {
    this.carritoVisible = !this.carritoVisible;
  }
  
  constructor() { }

  ngOnInit(){
    let pedidos =sessionStorage.getItem("carrito");
    if(pedidos){
      console.log(JSON.parse(pedidos))
      this.pedidos= JSON.parse(pedidos);
    }
    
  }

  anadePedido(pedidoNuevo:Pedido){
    const pedidoExistente = this.pedidos.find(pedido => pedido.videojuego.nombreVideojuego === pedidoNuevo.videojuego.nombreVideojuego 
      && pedido.videojuego.nombreConsola === pedidoNuevo.videojuego.nombreConsola);
    if(!pedidoExistente){
      this.pedidos.push(pedidoNuevo);
    }
    else{
      pedidoExistente.cantidad++;
    }
    sessionStorage.setItem("carrito", JSON.stringify(this.pedidos))
  }
}
