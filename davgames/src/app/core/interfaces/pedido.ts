import { Videojuego } from "./videojuego";

export interface Pedido{
    "id"?:number,
    "cantidad":number,
    "videojuego":Videojuego
}