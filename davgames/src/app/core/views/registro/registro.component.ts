import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  Rpassword: string = "";
  ccaa = ["Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla y León", "Castilla-La Mancha", 
  "Cataluña", "Extremadura", "Galicia", "La Rioja", "Madrid", "Murcia", "Navarra", "País Vasco", "Valencia"];

  usuario!: Usuario;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = {
      nombre: "",
      apellidos: "",
      fechaNac: new Date(),
      password: "",
      username: "",
      comunidadAutonoma:"",
      email: "",
      facturas: []
    }
  }

  datosCorrectos(){
    return this.usuario.password == this.Rpassword;
  }

  //Método para enviar los datos a la API e introducir el token en localStorage
  onSubmit(): void {
    if(this.datosCorrectos()){
      this.authService.register(this.usuario).subscribe(response => {
        //Podríamos guardar la respuesta aquí pero la vamos a guardar en el local storage
        this.router.navigate(["/"])
      })
    }
  }
  
}
