import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './core/shared/footer/footer.component';
import { LoginComponent } from './core/views/login/login.component';
import { RegistroComponent } from './core/views/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VentanaModalComponent } from './core/shared/ventana-modal/ventana-modal.component';
import { SharedModule } from './core/shared/shared.module';
import { VideojuegosComponent } from './core/views/videojuegos/videojuegos.component';
import { VideojuegoComponent } from './core/views/videojuegos/videojuego/videojuego.component';
import { HomeModule } from './core/views/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    VentanaModalComponent,
    VideojuegosComponent,
    VideojuegoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
