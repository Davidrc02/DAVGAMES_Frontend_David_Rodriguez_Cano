import { NgModule } from '@angular/core';
import { RouterModule, Routes, createUrlTreeFromSnapshot } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { VideojuegosAdministradorComponent } from './videojuegos-administrador/videojuegos-administrador.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { CrearVideojuegoComponent } from './videojuegos-administrador/crear-videojuego/crear-videojuego.component';
import { EditarVideojuegoComponent } from './videojuegos-administrador/editar-videojuego/editar-videojuego.component';

const routes: Routes = [
    {
        path: "",
        component:AdministradorComponent,
        children:[
            {path:"", component:UsuariosComponent},
            {path:"usuarios", component:UsuariosComponent},
            {path:"videojuegos", component:VideojuegosAdministradorComponent}
        ]
    },
    {path:"usuarios/crearUsuario", component:CrearUsuarioComponent},
    {path:"usuarios/editarUsuario/:id", component:EditarUsuarioComponent},
    {path:"videojuegos/crearVideojuego", component:CrearVideojuegoComponent},
    {path:"videojuegos/editarVideojuego/:videojuego/:consola", component:EditarVideojuegoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }