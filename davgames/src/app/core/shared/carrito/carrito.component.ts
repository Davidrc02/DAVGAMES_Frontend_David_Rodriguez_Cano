import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../interfaces/pedido';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  constructor(private carritoService: CarritoService) {
  }

  toggleCarrito() {
    this.carritoService.toggleCarrito();
  }

  get carritoVisible() {
    return this.carritoService.carritoVisible;
  }

  get pedidos() {
    return this.carritoService.pedidos;
  }

  verificarNumero(pedido: any) {
    const inputId = "cantidad" + pedido.videojuego.nombreVideojuego + pedido.videojuego.nombreConsola;
    const inputElement: HTMLInputElement | null = document.getElementById(inputId) as HTMLInputElement;

    if (inputElement) {
      const inputValue = inputElement.value;
      if (isNaN(Number(inputValue))) {
        inputElement.value = "1";
        pedido.cantidad=1;
      }
      if((Number(inputValue))>pedido.videojuego.stock){
        inputElement.value = ""+pedido.videojuego.stock;
        pedido.cantidad=pedido.videojuego.stock;
      }
    }
  }

  reduceCantidad(pedido:Pedido){
    const index = this.carritoService.pedidos.indexOf(pedido);
    var pedidoArray:any = this.carritoService.pedidos.at(index)
    var cantidad = pedidoArray?.cantidad
    if(cantidad && cantidad>1){
      this.carritoService.reduceCantidad(pedido);
    }
  }

  aumentaCantidad(pedido:Pedido){
    const index = this.carritoService.pedidos.indexOf(pedido);
    var pedidoArray:any = this.carritoService.pedidos.at(index)
    var cantidad = pedidoArray?.cantidad
    if(cantidad && cantidad<pedido.videojuego.stock){
      this.carritoService.anadePedido(pedido);
    }
  }

  quitarPedido(pedido: Pedido) {
    const index = this.carritoService.pedidos.indexOf(pedido);
    if (index !== -1) {
      this.carritoService.pedidos.splice(index, 1);
      this.carritoService.eliminaPedido(pedido);
    }
  }

  get total():number{
    var total=0;
    if(this.carritoService.pedidos.length==0){
      return total;
    }
    else{
      this.carritoService.pedidos.forEach(pedido => {
        total+=pedido.cantidad*pedido.videojuego.precio;
      });
      return total;
    }
  }
}
