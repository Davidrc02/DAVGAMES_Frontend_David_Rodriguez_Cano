import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Pedido } from 'src/app/core/interfaces/pedido';
import { AuthService } from 'src/app/core/services/auth.service';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { PagoService } from 'src/app/core/services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent {
  pedidos: Pedido[] = [];
  eleccion!: string;
  saldo!: number;
  cargaPago: boolean = false;
  @Input('pagoAbierto') pagoAbierto!: Boolean;
  @Output() valueEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private carritoService: CarritoService, private authService: AuthService, private pagoService: PagoService, private router: Router) {
  }

  ngOnInit() {
    this.carritoService.getPedidos().then(resultado => {
      this.pedidos = resultado;
    });
    this.pedidos = this.carritoService.pedidos;
    if (this.authService.usuario) {
      this.saldo = this.authService.usuario.saldo
    }
  }

  get total(): number {
    var total = 0;
    if (this.carritoService.pedidos.length == 0) {
      return total;
    }
    else {
      this.carritoService.pedidos.forEach(pedido => {
        total += pedido.cantidad * pedido.videojuego.precio;
      });
      return total;
    }
  }

  cambiaEleccion(eleccion: string) {
    this.eleccion = eleccion;
  }

  cerrarPago() {
    this.valueEmitter.emit(true);
  }

  pagar() {
    if (this.cargaPago == false) {
      this.cargaPago = true;
      if (this.authService.usuario) {
        this.pagoService.pagar(this.authService.usuario, this.carritoService.pedidos).pipe(
          tap(response => {
            Swal.fire({
              title: response.body.mensaje,
              icon: 'info',
              confirmButtonColor: 'goldenrod',
              background: '#474747',
              color: '#ffffff',
              confirmButtonText: 'OK',
            })
            this.cerrarPago();
            this.carritoService.vaciarCarrito();
            this.router.navigate(['']);
          }),
          catchError(error => {
            console.error("Ocurrió un error al realizar el pago")
            Swal.fire({
              title: 'Ocurrió un error al realizar el pago',
              icon: 'warning',
              confirmButtonColor: 'goldenrod',
              background: '#474747',
              color: '#ffffff',
              confirmButtonText: 'OK',
            })
            this.cerrarPago();
            return of(null);
          })
        ).subscribe();
      }
    }
  }
}
