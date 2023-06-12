import { Component } from '@angular/core';
import { Pedido } from '../../interfaces/pedido';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent {
  pagar:Boolean=false;
  pedidos:Pedido[]=[];

  constructor(private carritoService: CarritoService){
  }

  ngOnInit(){
    this.carritoService.getPedidos().then(resultado => {
      console.log(resultado)
      this.pedidos = resultado;
    });
    this.pedidos = this.carritoService.pedidos;

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
    this.carritoService.anadePedido(pedido);
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

  confirmarPago(){
    this.pagar=true;
  }
}
