import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './core/shared/dashboard/dashboard.component';
import { HomeComponent } from './core/views/home/home.component';
import { FooterComponent } from './core/shared/footer/footer.component';
import { LoginComponent } from './core/views/login/login.component';
import { LogoComponent } from './core/shared/logo/logo.component';
import { RegistroComponent } from './core/views/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VentanaModalComponent } from './core/shared/ventana-modal/ventana-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    LogoComponent,
    RegistroComponent,
    VentanaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
