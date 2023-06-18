import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DashboardSecundarioComponent } from './dashboard-secundario/dashboard-secundario.component';
import { SharedRoutingModule } from './shared-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PagoComponent } from './pago/pago.component';
import { DavcoinComponent } from './davcoin/davcoin.component';
import { PagarComponent } from './pago/pagar/pagar.component';

@NgModule({
  declarations: [
    LogoComponent,
    CarritoComponent,
    DashboardSecundarioComponent,
    DashboardComponent,
    PagoComponent,
    DavcoinComponent,
    PagarComponent
  ],
  imports: [
    SharedRoutingModule,
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    LogoComponent,
    CarritoComponent,
    DashboardSecundarioComponent,
    DashboardComponent,
    PagarComponent,
    DavcoinComponent
  ]
})
export class SharedModule { }
