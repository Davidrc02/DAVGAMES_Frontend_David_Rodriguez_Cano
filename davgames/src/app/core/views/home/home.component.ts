import { Component } from '@angular/core';
import { Videojuego } from '../../interfaces/videojuego';
import { VideojuegosService } from '../../services/videojuegos.service';
import { tap } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { BusquedaService } from '../../services/busqueda.service';

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

  constructor(private videojuegosService: VideojuegosService, private carritoService: CarritoService, private router: Router, private busquedaService: BusquedaService){}

  ngOnDestroy(){
    if(this.carritoService.carritoVisible)
      this.carritoService.toggleCarrito();
  }

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
        if(videojuegosPorFranquicia.length>=3){
          let videojuegosUnicos = new Set(videojuegosPorFranquicia.map(videojuego => videojuego.nombreVideojuego));
          if(videojuegosUnicos.size>=3){
            this.videojuegosFranquicia[cont]=videojuegosPorFranquicia;
            cont++;
          }
          
        }
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
    return franquiciasUnicas;
  }

  cargarRecomendados(){
    this.videojuegosRecomendados= this.videojuegos.sort((a,b) => b.stock-a.stock);
  }

  changebusquedaAvanzada():void{
    this.busquedaAvanzada= !this.busquedaAvanzada
  }

  buscar(){
      if(this.busqueda!=""){
        this.busquedaService.setBusqueda(this.busqueda);
        this.router.navigate(["/videojuegos"])
      }
  }

  get carritoVisible() {
    return this.carritoService.carritoVisible;
  }

  getConsolas(){
    var aux = this.videojuegos;
    if(aux){
      const listaNombresConsola = Array.from(new Set(aux.map(v => v.nombreConsola)));
      return listaNombresConsola;
    }
    return null;
  }

  getGeneros(){
    var aux = this.videojuegos;
    if(aux){
      const listaGeneros = Array.from(new Set(aux.map(v => v.genero)));
      return listaGeneros;
    }
    return null;
  }
}
