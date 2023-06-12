import { Component } from '@angular/core';
import { Pedido } from 'src/app/core/interfaces/pedido';
import { CarritoService } from 'src/app/core/services/carrito.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent {
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
