import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string ="";
  password: string ="";
  loginForm!: FormGroup;
  formSubmitted:boolean = false;
  erroresCampos: any = {
    required: 'El campo es requerido'
  };

  constructor(private authService: AuthService,private formBuilder: FormBuilder, private router:Router){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if(field){
      if (field.hasError('required')) {
        return this.erroresCampos.required;
      }
    }
    return '';
  }

  //Método para enviar los datos a la API e introducir el token en localStorage
  onSubmit():void{
    this.formSubmitted=true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(
      tap(response => {
        //Podríamos guardar la respuesta aquí pero la vamos a guardar en el local storage
        Swal.fire({
          title: 'Has iniciado sesión de forma satisfactoria',
          icon: 'info',
          confirmButtonColor: 'goldenrod',
          background:'#474747',
          color:'#ffffff',
          confirmButtonText: 'OK',
        })
        this.router.navigate(["/"])
      }),
      catchError((error) => {
        console.error(error);
        Swal.fire({
          title: 'El usuario o la contraseña son incorrectos',
          icon: 'warning',
          confirmButtonColor: 'goldenrod',
          background:'#474747',
          color:'#ffffff',
          confirmButtonText: 'OK',
        })
        return of(null);
      })
    ).subscribe()
  }
}
