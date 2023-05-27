import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService: AuthService) {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuth();
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
}
