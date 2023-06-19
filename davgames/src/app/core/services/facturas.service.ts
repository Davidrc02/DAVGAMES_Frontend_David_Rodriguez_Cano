import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Factura } from '../interfaces/factura';

@Injectable({
    providedIn: 'root'
})
export class FacturasService {

    constructor(private http: HttpClient){
    }
    
    getFacturas(usuario:Usuario){
        var url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/facturas/"+usuario.email;
        var headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

        return this.http.get<any>(url, {headers:headers, observe: 'response'}).pipe()
    }

    getPedidos(factura:Factura): Observable<any>{
        var url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/facturas/obtenerPedidos/"+factura.id;
        var headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

        return this.http.get<any>(url, {headers:headers, observe: 'response'}).pipe()
    }
}