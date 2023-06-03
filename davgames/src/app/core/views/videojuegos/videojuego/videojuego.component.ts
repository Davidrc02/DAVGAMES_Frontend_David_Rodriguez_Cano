import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Pedido } from 'src/app/core/interfaces/pedido';
import { Videojuego } from 'src/app/core/interfaces/videojuego';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { VideojuegosService } from 'src/app/core/services/videojuegos.service';

@Component({
  selector: 'app-videojuego',
  templateUrl: './videojuego.component.html',
  styleUrls: ['./videojuego.component.scss']
})
export class VideojuegoComponent {
  videojuego!:Videojuego;
  consolas!:string[];
  constructor(private videojuegosService: VideojuegosService, private router: Router, private carritoService: CarritoService){}

  ngOnInit(){
    this.cargarVideojuego();
  }

  cargarVideojuego(): Promise<void> {
    return new Promise<void>((resolve) => {
      var url = this.router.url.split("/");
      var nombreVideojuego = url[url.length - 2];
      var nombreConsola = url[url.length - 1];
      this.videojuegosService.obtenerVideojuego(nombreVideojuego, nombreConsola).pipe(
        tap((response) => {
          if (response) {
            this.videojuego = response;
            this.getConsolas(this.videojuego.nombreVideojuego);
            resolve(); // Resuelve la promesa una vez que se completa la carga del videojuego
          }
        })
      ).subscribe();
    });
  }

  ngOnDestroy(){
    if(this.carritoService.carritoVisible)
      this.carritoService.toggleCarrito();
  }

  isConsolaActiva(consola:string){
    var url= this.router.url.split("/");
    return consola.split(" ").every((element, index)=> element === url[url.length-1].split("%20")[index]);
  }

  getConsolas(nombreVideojuego:string){
    this.videojuegosService.obtenerConsolasPorNombreVideojuego(nombreVideojuego).pipe(
      tap((response)=>{
        if(response.body){
          this.consolas= response.body;
        }
      })
    ).subscribe();
  }

  async anadeCarritoJuego(){
    await this.cargarVideojuego();
    var pedido: Pedido = {
      "videojuego": this.videojuego,
      "cantidad": 1
    }
    this.carritoService.anadePedido(pedido);
  }

  async cambiarConsola(consola:string){
    var urlActual = this.router.url.split("/")
    urlActual[urlActual.length-1]=consola
    var rutaLimpia = decodeURI(urlActual.map(segmento => encodeURI(segmento)).join("/")).replace(/%20/g, ' ');

    await this.router.navigate([rutaLimpia]);
    await this.ngOnInit();
  }

}
