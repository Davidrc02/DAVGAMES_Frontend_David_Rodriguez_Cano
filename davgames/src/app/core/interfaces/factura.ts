import { Pedido } from "./pedido";

export interface Factura {
    "id"?:number,
    "fechaHora":Date,
    "pedidos":Pedido[]
}