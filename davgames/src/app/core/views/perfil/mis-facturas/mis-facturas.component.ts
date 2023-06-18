import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Factura } from 'src/app/core/interfaces/factura';
import { Pedido } from 'src/app/core/interfaces/pedido';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { FacturasService } from 'src/app/core/services/facturas.service';

@Component({
  selector: 'app-mis-facturas',
  templateUrl: './mis-facturas.component.html',
  styleUrls: ['./mis-facturas.component.scss']
})
export class MisFacturasComponent {
  usuario!:Usuario;
  facturas!:Factura[];
  pedidos: Map<Factura, Pedido[]> = new Map<Factura, Pedido[]>();
  pedidosMostradosMap: Map<Factura, boolean> = new Map<Factura, boolean>();

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router:Router, private facturasService: FacturasService){}

  ngOnInit(){
    this.obtenerUsuario();
    this.obtenerFacturas();
  }

  obtenerUsuario(){
    if(this.authService.usuario){
      this.usuario=this.authService.usuario;
    }
  }

  obtenerFacturas(){
    if(this.usuario){
      this.facturasService.getFacturas(this.usuario).pipe(
        tap((response)=>{
          this.facturas=response.body;
        })
      ).subscribe()
    }
  }

  muestraPedidos(factura: Factura){
    if(this.pedidosMostradosMap.get(factura)==true)
      this.pedidosMostradosMap.set(factura, false)
    else
      this.pedidosMostradosMap.set(factura, true)
      this.getPedidos(factura);
  }

  getPedidos(factura:Factura){
    this.facturasService.getPedidos(factura).pipe(
      tap(response=>{
        this.pedidos.set(factura, response.body);
      })
    ).subscribe();
  }

  getTotal(factura:Factura){
    var pedidos = this.pedidos.get(factura);
    const total = pedidos?.map(pedido => pedido.videojuego.precio * 10).reduce((acumulador, precio) => acumulador + precio, 0);

    return total;
  }

  pedidosMostrados(factura:Factura){
    return this.pedidosMostradosMap.get(factura);
  }
}
