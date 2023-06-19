import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Se ha cerrado su sesión',
      icon: 'warning',
      confirmButtonColor: 'goldenrod',
      background:'#474747',
      color:'#ffffff',
      confirmButtonText: 'OK',
    })
    this.router.navigate(['']);
  }

}

