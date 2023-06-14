import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  usuarios!: Usuario[] | null;

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios():void{
    this.usuarioService.getUsuarios()
      .pipe(
        tap((response: Usuario[]) => {
          if (response) {
            this.usuarios = response;
          }
        })
      )
      .subscribe();
  }

  eliminarUsuario(id:number | undefined){
    Swal.fire({
      title: '¿Está seguro que desea borrar a este usuario?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: 'goldenrod',
      background:'#474747',
      color:'#ffffff',
      denyButtonColor: '#d33',
      confirmButtonText: 'Sí',
      denyButtonText:"Cancelar"
    }).then((result)=>{
        if(result.isConfirmed &&  id){
          this.usuarioService.eliminarUsuario(id).pipe(
            tap((response) => {
              if(response){
                this.getUsuarios();
              }
            })
          ).subscribe();
        }else if(result.isDenied){
        Swal.fire({
          background:'#474747',
          color:'#ffffff',
          title: 'No se ha borrado al usuario',
          icon: 'info',
          confirmButtonColor: 'goldenrod'})
      }
    })
  }
}
