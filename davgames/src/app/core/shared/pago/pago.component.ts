import { Component } from '@angular/core';
import { Pedido } from '../../interfaces/pedido';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent {
  pagar:Boolean=false;
  pedidos:Pedido[]=[];

  constructor(private carritoService: CarritoService, private authService: AuthService, private router:Router){
  }

  ngOnInit(){
    this.carritoService.getPedidos().then(resultado => {
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
    if(this.authService.isAuth()){
      this.pagar=true;
    }
    else{
      Swal.fire({
        title: 'Para efectuar el pago primero debe iniciar sesión.',
        icon: 'warning',
        confirmButtonColor: 'goldenrod',
        background:'#474747',
        color:'#ffffff',
        confirmButtonText: 'OK',
      }).then((result)=>{
          if(result.isConfirmed){
            this.router.navigate(['/login'])
          }
      })
      
    }
   
  }

  cerrarPago(){
    this.pagar=false;
  }

  getPagar(){
    return this.pagar;
  }
}
