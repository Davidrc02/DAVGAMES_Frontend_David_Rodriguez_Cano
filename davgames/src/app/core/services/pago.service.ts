import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Carrito } from '../interfaces/carrito';
import { Pedido } from '../interfaces/pedido';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor(private http: HttpClient) { }

  pagar(usuario:Usuario, pedidos:Pedido[]): Observable<any> {
    var url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/facturas/realizarFactura";
    var token = localStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    var body = {
      fechaHora: new Date(),
      usuario:usuario,
      pedidos:pedidos
    }
    
    return this.http.put<any>(url, body, {headers:headers, observe:'response'});
  }
}
