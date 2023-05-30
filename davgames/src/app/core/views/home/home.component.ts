import { Component } from '@angular/core';
import { Videojuego } from '../../interfaces/videojuego';
import { VideojuegosService } from '../../services/videojuegos.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  busquedaAvanzada: boolean = false;
  busqueda: string = "";
  buscador: boolean =false;
  videojuegos!: Videojuego[];
  videojuegosRecomendados!: Videojuego[];
  videojuegosFranquicia: Videojuego[][]= [];

  constructor(private videojuegosService: VideojuegosService){}

  ngOnInit(){
    this.getVideojuegos();
  }

  getVideojuegos(): void {
		this.videojuegosService
			.getVideojuegos()
			.pipe(
				tap((response: Videojuego[]) => {
					this.videojuegos = response;
          this.cargarRecomendados();
          this.generarListasPorFranquicia()
				})
			)
			.subscribe();
	}

  generarListasPorFranquicia(){
    const franquicias = this.obtenerFranquiciasUnicas();
    var cont=0;
    franquicias.forEach((franquicia) => {
      var videojuegosPorFranquicia = this.videojuegos.filter((videojuego) => videojuego.franquicia === franquicia);
      console.log(videojuegosPorFranquicia)
      this.videojuegosFranquicia[cont]=videojuegosPorFranquicia;
      cont++;
    });
  }
  
  obtenerFranquiciasUnicas(): string[] {
    const franquiciasUnicas: string[] = [];
    const franquiciasSet: string[] = [];
  
    this.videojuegos.forEach((videojuego) => {
      franquiciasSet.push(videojuego.franquicia);
    });
  
    franquiciasSet.forEach((franquicia) => {
        if(!franquiciasUnicas.includes(franquicia))
          franquiciasUnicas.push(franquicia);
    });
    console.log(franquiciasUnicas)
    return franquiciasUnicas;
  }

  cargarRecomendados(){
    this.videojuegosRecomendados= this.videojuegos.sort((a,b) => b.stock-a.stock);
  }

  changebusquedaAvanzada():void{
    this.busquedaAvanzada= !this.busquedaAvanzada
  }

  buscar(){
    if(this.buscador){
      if(this.busqueda!=""){
        //buscar
      }else{
        //esconder buscador
        this.buscador=false;
      }
    }else{
      this.buscador=true;
    }
  }
}
