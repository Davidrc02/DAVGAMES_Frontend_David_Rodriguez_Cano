import { Component, Input } from '@angular/core';
import { Videojuego } from 'src/app/core/interfaces/videojuego';

@Component({
  selector: 'app-franquicia',
  templateUrl: './franquicia.component.html',
  styleUrls: ['./franquicia.component.scss']
})
export class FranquiciaComponent {
  @Input("videojuegosFranquiciaPadre") videojuegosFranquiciaPadre: Videojuego[] | undefined;
  videojuegosFranquicia!: Videojuego[];
  stringList!: string[];

  animaciones: { [key: string]: boolean } = {};

  constructor() { }
  
  ngOnInit(){
    if(this.videojuegosFranquiciaPadre){
      this.videojuegosFranquicia=this.videojuegosFranquiciaPadre;
      this.cargarFranquicia();
    }
  }

  cargarFranquicia(){
    var nombresUnicos:string[] = [];
    if(this.videojuegosFranquiciaPadre){
      this.videojuegosFranquicia = this.videojuegosFranquiciaPadre.filter(videojuego => {
        if (!nombresUnicos.includes(videojuego.nombreVideojuego)) {
          nombresUnicos.push(videojuego.nombreVideojuego);
          return true;
        }
        return false;
      });
      this.videojuegosFranquicia.sort(
        (a, b) =>
          new Date(b.fechaLanzamiento).getTime() -
          new Date(a.fechaLanzamiento).getTime()
      );
    }
  }

  scrollIzquierda(){
    console.log("a")
    var slider=document.getElementById("slider"+this.videojuegosFranquicia[0].franquicia);
    if(slider){
      slider.scrollLeft -= 830
    }
  }

  scrollDerecha(){
    var slider=document.getElementById("slider"+this.videojuegosFranquicia[0].franquicia);
    if(slider){
      slider.scrollLeft += 830
    }
  }

  startAnimation(nombreVideojuego: string) {
    this.animaciones[nombreVideojuego] = true;
  }

  stopAnimation(nombreVideojuego: string) {
    this.animaciones[nombreVideojuego] = false;
  }
}