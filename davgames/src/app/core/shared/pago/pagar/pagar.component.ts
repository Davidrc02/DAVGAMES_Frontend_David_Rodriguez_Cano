import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tap } from 'rxjs';
import { Pedido } from 'src/app/core/interfaces/pedido';
import { AuthService } from 'src/app/core/services/auth.service';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { PagoService } from 'src/app/core/services/pago.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent {
  pedidos:Pedido[]=[];
  eleccion!:string;
  saldo!:number;
  @Input('pagoAbierto') pagoAbierto!:Boolean;
  @Output() valueEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private carritoService: CarritoService, private authService:AuthService, private pagoService: PagoService){
  }

  ngOnInit(){
    this.carritoService.getPedidos().then(resultado => {
      console.log(resultado)
      this.pedidos = resultado;
    });
    this.pedidos = this.carritoService.pedidos;
    this.saldo = this.authService.usuario.saldo
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

  cambiaEleccion(eleccion:string){
    this.eleccion=eleccion;
  }

  cerrarPago(){
    this.valueEmitter.emit(true);
  }

  pagar(){
    this.pagoService.pagar(this.authService.usuario, this.carritoService.pedidos).pipe(
      tap(response=>{
        console.log("Test 2 superado: recoge la info del controlador")
        console.log("Info: "+response)
        console.log("Body de la info: "+response.body)
        console.log("Mensaje del body de la info: "+response.body.mensaje)
      })
    ).subscribe();
  }
}
