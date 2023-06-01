import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-secundario',
  templateUrl: './dashboard-secundario.component.html',
  styleUrls: ['./dashboard-secundario.component.scss']
})
export class DashboardSecundarioComponent {
  constructor(private router:Router){
  }

  inicio(){
    this.router.navigate([''])
  }
}
