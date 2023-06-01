import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Videojuego } from 'src/app/core/interfaces/videojuego';
import { VideojuegosService } from 'src/app/core/services/videojuegos.service';

@Component({
  selector: 'app-videojuego',
  templateUrl: './videojuego.component.html',
  styleUrls: ['./videojuego.component.scss']
})
export class VideojuegoComponent {
  videojuego!:Videojuego;
  constructor(private videojuegosService: VideojuegosService, private router: Router){}

  ngOnInit(){
    this.cargarVideojuego();
  }

  cargarVideojuego(){
    var url= this.router.url.split("/");
    var nombreVideojuego = url[url.length-2]
    var nombreConsola = url[url.length-1]

    this.videojuegosService.obtenerVideojuego(nombreVideojuego, nombreConsola).pipe(
        tap((response)=>{
          if(response){
            this.videojuego= response;
            console.log(this.videojuego)
          }
        })
      ).subscribe();

  }
}
