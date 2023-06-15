import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { VideojuegoRecomendadoComponent } from './videojuego-recomendado/videojuego-recomendado.component';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { TendenciasModule } from './tendencias/tendencias.module';
import { FranquiciaModule } from './franquicia/franquicia.module';
import { VideojuegoRecomendadoModule } from './videojuego-recomendado/videojuego-recomendado.module';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    TendenciasModule,
    FranquiciaModule,
    VideojuegoRecomendadoModule
  ],
  exports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent
  ]
})
export class HomeModule { }
