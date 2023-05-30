import { Component, Input } from '@angular/core';
import { Videojuego } from 'src/app/core/interfaces/videojuego';

@Component({
  selector: 'app-videojuego-recomendado',
  templateUrl: './videojuego-recomendado.component.html',
  styleUrls: ['./videojuego-recomendado.component.scss']
})
export class VideojuegoRecomendadoComponent {
  @Input("videojuegoRecomendadoPadre") videojuegoRecomendadoPadre:Videojuego | undefined;
  videojuegoRecomendado!:Videojuego;
  fuente!:string;

  constructor(){}

  ngOnInit(){
    if(this.videojuegoRecomendadoPadre){
      this.videojuegoRecomendado=this.videojuegoRecomendadoPadre;
      this.getFuente();
    }  
  }

  getFuente(){
    if(this.videojuegoRecomendado.nombreVideojuego.toLowerCase().startsWith("assassin")){
      this.fuente="assassins";
    }
    else if(this.videojuegoRecomendado.nombreVideojuego.toLowerCase().startsWith("call of duty")){
      this.fuente="callofduty";
    }
    else{
      this.fuente="";
    }
  }
} 
