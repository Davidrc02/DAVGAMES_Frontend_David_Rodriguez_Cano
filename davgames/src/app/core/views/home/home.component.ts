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
				})
			)
			.subscribe();
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
