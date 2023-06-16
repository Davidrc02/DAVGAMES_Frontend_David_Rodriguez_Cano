import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  usuario!:Usuario;

  constructor(private authService:AuthService, private router: Router){}

  ngOnInit(){
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    if(this.authService.usuario){
      this.usuario=this.authService.usuario;
      this.router.navigate(["perfil/"+this.usuario.username])
    }
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}

