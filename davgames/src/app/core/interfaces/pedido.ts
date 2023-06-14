import { Videojuego } from "./videojuego";

export interface Pedido{
    "id"?:number,
    "factura"?:number,
    "cantidad":number,
    "videojuego":Videojuego
}