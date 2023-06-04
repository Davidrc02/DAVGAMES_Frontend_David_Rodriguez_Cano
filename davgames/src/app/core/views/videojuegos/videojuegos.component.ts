import { Component } from '@angular/core';
import { Videojuego } from '../../interfaces/videojuego';
import { VideojuegosService } from '../../services/videojuegos.service';
import { tap } from 'rxjs';
import { Filtro } from '../../interfaces/filtro';
import { FiltradoVideojuegoService } from '../../services/filtradoVideojuego.service';

@Component({
    selector: 'app-videojuegos',
    templateUrl: './videojuegos.component.html',
    styleUrls: ['./videojuegos.component.scss']
})
export class VideojuegosComponent {
    videojuegos!: Videojuego[];
    videojuegosFiltrados!: Videojuego[];
    videojuegosMostrados!: Videojuego[];
    animaciones: { [key: string]: boolean } = {};
    busquedaTexto: string = "";

    constructor(private videojuegosService: VideojuegosService, private filtroService: FiltradoVideojuegoService) {
    }

    ngOnInit() {
        this.cargarVideojuegos();
    }

    cargarVideojuegos() {
        this.videojuegosService.getVideojuegos().pipe(
            tap((response) => {
                if (response) {
                    if (response) {
                        this.videojuegos = response;
                        this.videojuegosFiltrados = this.videojuegos;
                        this.buscarJuegos();
                    }
                }
            })
        ).subscribe();
    }

    startAnimation(nombreVideojuego: string) {
        this.animaciones[nombreVideojuego] = true;
    }

    stopAnimation(nombreVideojuego: string) {
        this.animaciones[nombreVideojuego] = false;
    }

    buscarJuegos() {
        this.videojuegosFiltrados=this.videojuegos;
        this.busquedaJuegos();
        if(this.filtroService.filtros.length!=0){
            this.filtradoJuegos();
        }
    }

    busquedaJuegos(){
        var busquedaTexto = (<HTMLInputElement>document.getElementById("busquedaTexto"))?.value;
        console.log("Busqueda:'"+busquedaTexto+"'")
        this.busquedaTexto = busquedaTexto;
        var aux = this.videojuegosFiltrados;
        this.videojuegosFiltrados= aux.filter((videojuego: Videojuego) => {
            if (busquedaTexto != null) {
                if (videojuego.nombreVideojuego.toLowerCase().includes(busquedaTexto.toLowerCase())) {
                    return true;
                }
                return false;
            }
            return false;
        });
    }

    filtradoJuegos(){
        var videojuegosFiltrados = this.videojuegosFiltrados;
        var filtros = this.filtroService.filtros;
        if (filtros) {
            filtros.forEach(filtro => {
                switch (filtro.nombre) {
                    case "consola":
                        videojuegosFiltrados = videojuegosFiltrados.filter((videojuego: Videojuego) => {
                            return videojuego.nombreConsola == filtro.valor;
                        })
                        break;
                    case "genero":
                        videojuegosFiltrados = videojuegosFiltrados.filter((videojuego: Videojuego) => {
                            return videojuego.genero == filtro.valor;
                        })
                        break;
                }
            });
        }
        this.videojuegosFiltrados = videojuegosFiltrados;
    }

    getVideojuegosMostrados() {
        if (this.videojuegosFiltrados) {
            var nombresUnicos: string[] = [];
            var videojuegosFiltrados = this.videojuegosFiltrados;
            this.videojuegosMostrados = videojuegosFiltrados.filter((videojuego: Videojuego) => {
                if (!nombresUnicos.includes(videojuego.nombreVideojuego)) {
                    nombresUnicos.push(videojuego.nombreVideojuego);
                    return true;
                }
                return false;
            });
            return this.videojuegosMostrados;
        }
        return null
    }

    getFiltros() {
        if (this.filtroService.filtros.length != 0) {
            return this.filtroService.filtros;
        }
        return null;
    }

    getConsolas() {
        if (this.videojuegos) {
            var aux = this.videojuegos;
            const listaNombresConsola = Array.from(new Set(aux.map(v => v.nombreConsola)));
            return listaNombresConsola;
        }
        return null
    }

    getGeneros() {
        if (this.videojuegos) {
            var aux = this.videojuegos;
            const listaGeneros = Array.from(new Set(aux.map(v => v.genero)));
            return listaGeneros;
        }
        return null
    }

    async anadeFiltro(nombre: string, valor: string) {
        var filtro: Filtro = {
            "nombre": nombre,
            "valor": valor
        }
        await this.filtroService.anadeFiltro(filtro);
        await this.buscarJuegos();
    }

    async quitarFiltro(nombre: string){
        await this.filtroService.quitarFiltro(nombre);
        await this.buscarJuegos();
    }

}

