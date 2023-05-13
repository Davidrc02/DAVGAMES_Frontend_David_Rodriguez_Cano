import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FacturasComponent } from './facturas/facturas.component';

const routes: Routes = [
    {
        path: "",
        component:AdministradorComponent,
        children:[
            {path:"videojuegos", component:VideojuegosComponent},
            {path:"usuarios", component:UsuariosComponent},
            {path:"facturas", component:FacturasComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }