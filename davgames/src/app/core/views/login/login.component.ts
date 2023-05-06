import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string ="";
  password: string ="";

  constructor(private authService: AuthService, private router:Router){}

  //Método para enviar los datos a la API e introducir el token en localStorage
  onSubmit():void{
    this.authService.login(this.username, this.password).subscribe(response => {
      //Podríamos guardar la respuesta aquí pero la vamos a guardar en el local storage
      this.router.navigate(["/"])
    })
  }
}
