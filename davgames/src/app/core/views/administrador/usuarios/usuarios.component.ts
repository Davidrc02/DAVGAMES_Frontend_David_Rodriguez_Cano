import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

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
    if(id){
      this.usuarioService.eliminarUsuario(id).pipe(
          tap((response) => {
            if(response){
              this.getUsuarios();
            }
          })
        ).subscribe();
    }
  }
}
