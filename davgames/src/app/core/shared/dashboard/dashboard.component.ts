import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService, private carritoService: CarritoService) {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuth();
  }

  ngOnInit(){
    let pedidos =sessionStorage.getItem("carrito");
    if(pedidos){
      this.carritoService.pedidos= JSON.parse(pedidos);
    }
    
  }

  logout() {
    this.authService.logout();
    Swal.fire({
      title: 'Se ha cerrado su sesión',
      icon: 'warning',
      confirmButtonColor: 'goldenrod',
      background:'#474747',
      color:'#ffffff',
      confirmButtonText: 'OK',
    })
    
  }

  toggleCarrito() {
    this.carritoService.toggleCarrito();
  }

  get carritoVisible() {
    return this.carritoService.carritoVisible;
  }

  get pedidos() {
    return this.carritoService.pedidos;
  }
}
