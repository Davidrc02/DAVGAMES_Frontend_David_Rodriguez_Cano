import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BusquedaService {
    busqueda: string = "";

    constructor() {
    }

    getBusqueda() {
        return this.busqueda;
    }
    setBusqueda(busqueda: string) {
        this.busqueda = busqueda
    }

}
