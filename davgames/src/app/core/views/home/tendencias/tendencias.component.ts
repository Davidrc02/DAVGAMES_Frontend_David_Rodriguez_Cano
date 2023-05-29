import { Component, Input} from '@angular/core';
import { HomeComponent } from '../home.component';
import { Videojuego } from 'src/app/core/interfaces/videojuego';


@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.scss']
})
export class TendenciasComponent {
  @Input("videojuegosPadre") videojuegosPadre: Videojuego[] | undefined;
  videojuegosTendencias!: Videojuego[];

  constructor(){}

  ngOnInit(){
    if(this.videojuegosPadre)
      this.videojuegosTendencias=this.videojuegosPadre;
      this.cargarTendencias();
  }

  cargarTendencias(){
    var nombresUnicos:string[] = [];
    if(this.videojuegosPadre){
      this.videojuegosTendencias = this.videojuegosPadre.filter(videojuego => {
        if (!nombresUnicos.includes(videojuego.nombreVideojuego)) {
          nombresUnicos.push(videojuego.nombreVideojuego);
          return true;
        }
        return false;
      });

      this.videojuegosTendencias.sort(
        (a, b) =>
          new Date(b.fechaLanzamiento).getTime() -
          new Date(a.fechaLanzamiento).getTime()
      );
    }
  }

  scrollIzquierda(){
    var slider=document.getElementById("slider");
    if(slider){
      slider.scrollLeft -= 800
    }
    
  }

  scrollDerecha(){
    var slider=document.getElementById("slider");
    if(slider){
      slider.scrollLeft += 800
    }
  }

}
