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
  videojuegosMostrados!:Videojuego[];
  animaciones: { [key: string]: boolean } = {};
  busquedaTexto:string="";

  constructor(private videojuegosService: VideojuegosService, private filtroService: FiltradoVideojuegoService) {
  }

  ngOnInit() {
    this.cargarVideojuegos();
  }

  cargarVideojuegos() {
    this.videojuegosService.getVideojuegos().pipe(
      tap((response) => {
        if (response) {
          var nombresUnicos: string[] = [];
          if (response) {
            this.videojuegos = response;
            var videojuegosFiltrados = this.videojuegos;
            let filtros = this.filtroService.filtros;
            if(filtros){
              //Tenemos unos filtros
              filtros.forEach(filtro => {
                switch(filtro.nombre){
                  case "consola":
                    videojuegosFiltrados = videojuegosFiltrados.filter((videojuego:Videojuego) => {
                      //voy por aquí
                      return videojuego.nombreConsola==filtro.valor;
                    })
                    break;
                  case "genero":
                    videojuegosFiltrados = videojuegosFiltrados.filter((videojuego:Videojuego) => {
                      //voy por aquí
                      return videojuego.genero==filtro.valor;
                    })
                    break;
                }
              })
            }

            this.videojuegosMostrados = videojuegosFiltrados.filter((videojuego:Videojuego) => {
              if (!nombresUnicos.includes(videojuego.nombreVideojuego)) {
                nombresUnicos.push(videojuego.nombreVideojuego);
                return true;
              }
              return false;
            });
          }
        }})
    ).subscribe();
  }

  startAnimation(nombreVideojuego: string) {
    this.animaciones[nombreVideojuego] = true;
  }

  stopAnimation(nombreVideojuego: string) {
    this.animaciones[nombreVideojuego] = false;
  }

  buscarJuego(){
    var busquedaTexto = (<HTMLInputElement>document.getElementById("busquedaTexto"))?.value;
    this.busquedaTexto=busquedaTexto;
    var aux = this.videojuegos;
    this.videojuegosMostrados= aux.filter((videojuego:Videojuego) => {
      if(busquedaTexto!=null){
        if (videojuego.nombreVideojuego.toLowerCase().includes(busquedaTexto.toLowerCase())) {
          return true;
        }
        return false;
      }
      return false;
    });
    console.log(this.videojuegosMostrados)
  }

  getConsolas(){
    var aux = this.videojuegos;
    const listaNombresConsola = Array.from(new Set(aux.map(v => v.nombreConsola)));
    return listaNombresConsola;
  }

  getGeneros(){
    var aux = this.videojuegos;
    const listaGeneros = Array.from(new Set(aux.map(v => v.genero)));
    return listaGeneros;
  }

  async anadeFiltro(nombre:string, valor:string){
    var filtro:Filtro = {
      "nombre":nombre,
      "valor": valor
    }
    await this.filtroService.anadeFiltro(filtro);
    await this.cargarVideojuegos();
  }

}

