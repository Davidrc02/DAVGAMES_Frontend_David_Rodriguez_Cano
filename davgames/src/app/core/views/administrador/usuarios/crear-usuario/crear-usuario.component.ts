import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent {
  usuario!:Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(){
    this.resetearCampos();
  }

  resetearCampos(){
    this.usuario ={
      apellidos:"",
      nombre:"",
      username:"",
      email:"",
      password:"",
      comunidadAutonoma:"",
      facturas:[]
    }
  }

  crearUsuario(){
    this.usuarioService.crearUsuario(this.usuario).pipe(
        tap(response =>{
          this.router.navigate(['/administrador/usuarios']);
        }
        )
      ).subscribe();
  }
}
