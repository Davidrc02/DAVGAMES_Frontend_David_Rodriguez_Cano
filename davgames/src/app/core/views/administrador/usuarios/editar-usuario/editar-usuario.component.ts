import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  providers:[DatePipe]
})
export class EditarUsuarioComponent {
  usuario!:Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(){
    this.usuario = {
      apellidos:"",
      comunidadAutonoma:"",
      email:"",
      nombre:"",
      password:"",
      username:"",
      fechaNac:new Date,
      facturas:[]
    }
    this.obtenerUsuario();
  }

  onChangeDate(value:any) {
    this.usuario.fechaNac = new Date(value);
  }

  obtenerUsuario(){
    let url = this.router.url.split("/")
    let id = url[url.length-1];
    this.usuarioService.obtenerUsuario(parseInt(id)).pipe(
        tap((usuario)=>{
          this.usuario=usuario
        })
      ).subscribe();
  }

  editarUsuario(){
    this.usuarioService.editarUsuario(this.usuario).pipe(
      tap(response =>{
        this.router.navigate(['/administrador/usuarios']);
      }
      )
    ).subscribe();
  }
}
