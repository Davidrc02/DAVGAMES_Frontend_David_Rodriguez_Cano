import { Injectable } from '@angular/core';
import { Factura } from '../interfaces/factura';
import { Carrito } from '../interfaces/carrito';
import { Pedido } from '../interfaces/pedido';
import { Filtro } from '../interfaces/filtro';

@Injectable({
    providedIn: 'root'
})
export class FiltradoVideojuegoService {
    filtros: Filtro[]=[];

    constructor() { }

    ngOnInit() {
        this.filtros = [];
    }

    anadeFiltro(filtro: Filtro) {
        const index = this.filtros.findIndex(f => f.nombre === filtro.nombre);
        if (index !== -1) {
            this.filtros[index].valor = filtro.valor; // Actualizar valor del filtro existente
        } else {
            this.filtros.push(filtro); // Añadir nuevo filtro a la lista
        }
    }
}