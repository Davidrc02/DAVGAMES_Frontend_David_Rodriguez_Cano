import { Factura } from "./factura";

export interface Usuario {
    "id"?:number,
    "apellidos":string,
    "nombre":string,
    "username":string,
    "email":string,
    "password":string,
    "comunidadAutonoma":string,
    "fechaNac"?:Date,
    "facturas": Factura[],
    "saldo": number
}
