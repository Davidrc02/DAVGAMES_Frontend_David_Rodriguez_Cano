import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Videojuego } from 'src/app/core/interfaces/videojuego';
import { VideojuegosService } from 'src/app/core/services/videojuegos.service';

@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.scss']
})
export class VideojuegosComponent {
  videojuegos!: Videojuego[] | null;

  constructor(private videojuegosService: VideojuegosService){}

  ngOnInit(){
    this.getVideojuegos()
  }

  getVideojuegos():void{
    this.videojuegosService.getVideojuegos()
      .pipe(
        tap((response: Videojuego[]) => {
          if (response) {
            this.videojuegos = response;
          }
        })
      )
      .subscribe();
  }
}
