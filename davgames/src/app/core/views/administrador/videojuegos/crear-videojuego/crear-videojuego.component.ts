import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Videojuego } from 'src/app/core/interfaces/videojuego';
import { VideojuegosService } from 'src/app/core/services/videojuegos.service';

@Component({
  selector: 'app-crear-videojuego',
  templateUrl: './crear-videojuego.component.html',
  styleUrls: ['./crear-videojuego.component.scss']
})
export class CrearVideojuegoComponent {
  videojuego!:Videojuego;

  constructor(private videojuegoService: VideojuegosService, private router: Router){}

  ngOnInit(){
    this.resetearCampos();
  }

  resetearCampos(){
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
  }

  crearVideojuego(){
    this.videojuegoService.crearVideojuego(this.videojuego).pipe(
        tap(response =>{
          this.router.navigate(['/administrador/videojuegos']);
        }
        )
      ).subscribe();
  }
}
