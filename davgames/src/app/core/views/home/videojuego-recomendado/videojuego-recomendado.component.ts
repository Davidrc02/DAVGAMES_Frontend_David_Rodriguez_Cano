import { Component, Input } from '@angular/core';
import { Videojuego } from 'src/app/core/interfaces/videojuego';

@Component({
  selector: 'app-videojuego-recomendado',
  templateUrl: './videojuego-recomendado.component.html',
  styleUrls: ['./videojuego-recomendado.component.scss']
})
export class VideojuegoRecomendadoComponent {
  @Input("videojuegosRecomendadosPadre") videojuegosRecomendadosPadre: Videojuego[] | undefined;
  videojuegoRecomendado!: Videojuego;

  constructor(){}

  ngOnInit(){
    if(this.videojuegosRecomendadosPadre)
      this.videojuegoRecomendado=this.videojuegosRecomendadosPadre.sort((a,b) => a.stock-b.stock)[0];
  }
} 
