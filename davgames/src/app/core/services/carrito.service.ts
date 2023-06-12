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
    this.cargarPedidos(); 
  }

  cargarPedidos(){
    let pedidos = sessionStorage.getItem("carrito");
    if(pedidos){
      this.pedidos= JSON.parse(pedidos);
    }
  }

  async getPedidos(){
    await this.cargarPedidos();

    return this.pedidos
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

  eliminaPedido(pedidoAntiguo:Pedido){
    const pedidoExistente = this.pedidos.find(pedido => pedido.videojuego.nombreVideojuego === pedidoAntiguo.videojuego.nombreVideojuego 
      && pedido.videojuego.nombreConsola === pedidoAntiguo.videojuego.nombreConsola);
    if(pedidoExistente){
      this.pedidos.splice(this.pedidos.indexOf(pedidoExistente), 1);
    }
    sessionStorage.setItem("carrito", JSON.stringify(this.pedidos))
  }
  
  reduceCantidad(pedidoNuevo:Pedido){
    const pedidoExistente = this.pedidos.find(pedido => pedido.videojuego.nombreVideojuego === pedidoNuevo.videojuego.nombreVideojuego 
      && pedido.videojuego.nombreConsola === pedidoNuevo.videojuego.nombreConsola);
    if(pedidoExistente){
      pedidoExistente.cantidad--;
    }
    sessionStorage.setItem("carrito", JSON.stringify(this.pedidos))
  }

}
