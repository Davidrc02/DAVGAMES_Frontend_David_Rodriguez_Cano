import { Component } from '@angular/core';
import { Videojuego } from '../../interfaces/videojuego';
import { VideojuegosService } from '../../services/videojuegos.service';
import { tap } from 'rxjs';

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

  constructor(private videojuegosService: VideojuegosService) {

  }

  ngOnInit() {
    this.cargarVideojuegos();
  }

  cargarVideojuegos() {
    this.videojuegosService.getVideojuegos().pipe(
      tap((response) => {
        if (response) {
          console.log(response)
          var nombresUnicos: string[] = [];
          if (response) {
            this.videojuegos = response.filter((videojuego:Videojuego) => {
              if (!nombresUnicos.includes(videojuego.nombreVideojuego)) {
                nombresUnicos.push(videojuego.nombreVideojuego);
                return true;
              }
              return false;
            });
            this.videojuegosMostrados=this.videojuegos;
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

}

