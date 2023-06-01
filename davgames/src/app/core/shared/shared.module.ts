import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DashboardSecundarioComponent } from './dashboard-secundario/dashboard-secundario.component';
import { SharedRoutingModule } from './shared-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    LogoComponent,
    CarritoComponent,
    DashboardSecundarioComponent,
    DashboardComponent
  ],
  imports: [
    SharedRoutingModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    LogoComponent,
    CarritoComponent,
    DashboardSecundarioComponent,
    DashboardComponent
  ]
})
export class SharedModule { }
