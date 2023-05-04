import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  busqueda: boolean = false;

  busquedaAvanzada():void{
    this.busqueda= !this.busqueda
    console.log(this.busqueda)
  }
}
