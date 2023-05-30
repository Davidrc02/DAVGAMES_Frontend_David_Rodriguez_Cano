import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Videojuego } from 'src/app/core/interfaces/videojuego';
import { VideojuegosService } from 'src/app/core/services/videojuegos.service';

@Component({
  selector: 'app-editar-videojuego',
  templateUrl: './editar-videojuego.component.html',
  styleUrls: ['./editar-videojuego.component.scss']
})
export class EditarVideojuegoComponent {
  videojuego!:Videojuego;

  constructor(private videojuegoService: VideojuegosService, private router: Router){}

  ngOnInit(){
    this.videojuego ={
      "nombreVideojuego":"",
      "nombreConsola":"",
      "clasificacionEdad":0,
      "empresa":"",
      "fechaLanzamiento":new Date(),
      "franquicia":"",
      "genero":"",
      "numJugadores":0,
      "precio":0,
      "stock":0,
      "url":""
    }
    this.obtenerVideojuego();
  }

  onChangeDate(value:any) {
    this.videojuego.fechaLanzamiento = new Date(value);
  }

  obtenerVideojuego(){
    let url = this.router.url.split("/")
    let nombreVideojuego = url[url.length-2];
    let nombreConsola = url[url.length-1];
    this.videojuegoService.obtenerVideojuego(nombreVideojuego, nombreConsola).pipe(
        tap((videojuego)=>{
          this.videojuego=videojuego
        })
      ).subscribe();
  }

  editarVideojuego(){
    this.videojuegoService.editarVideojuego(this.videojuego).pipe(
        tap(response =>{
          this.router.navigate(['/administrador/videojuegos']);
        }
        )
      ).subscribe();
  }
}
