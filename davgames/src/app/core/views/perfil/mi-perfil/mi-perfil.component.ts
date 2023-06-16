import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent {
  usuario!:Usuario;
  cambioDatosForm!: FormGroup;
  cambioContrasenaForm!: FormGroup;
  erroresCampos: any = {
    required: 'El campo es requerido',
  };
  erroresContrasenna: any = {
    required: 'La contraseña es requerida',
    minlength: 'La contraseña debe tener al menos 8 caracteres',
    maxlength: 'La contraseña no puede tener más de 16 caracteres',
    pattern: 'La contraseña debe contener al menos una letra minúscula y una letra mayúscula',
    notEqual: 'Las contraseñas no coinciden'
  };

  constructor(private authService:AuthService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.obtenerUsuario();
    this.cambioDatosForm = this.formBuilder.group({
      usuario: [this.usuario.username, Validators.required],
      nombre: [this.usuario.nombre, Validators.required],
      apellidos: [this.usuario.apellidos, Validators.required]
    });

    this.cambioContrasenaForm = this.formBuilder.group({
      contrasenna: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/)]],
      confirContrasenna: ['', Validators.required]
    }, {
      validator: this.validarContraseñas
    });
  }

  obtenerUsuario(){
    if(this.authService.usuario){
      this.usuario=this.authService.usuario;
    }
  }

  validarContraseñas(control: AbstractControl) {
    const contrasenna = control?.get('contrasenna')?.value;
    const confirContrasenna = control?.get('confirContrasenna')?.value;

    if (contrasenna !== confirContrasenna) {
      control?.get('confirContrasenna')?.setErrors({ notEqual: true });
    } else {
      control?.get('confirContrasenna')?.setErrors(null);
    }
  }

  getErrorCCMessage(fieldName: string): string {
    const field = this.cambioContrasenaForm.get(fieldName);
    if(field){
      if (field.hasError('required')) {
        return this.erroresContrasenna.required;
      }
      if (field.hasError('minlength')) {
        return this.erroresContrasenna.minlength;
      }
      if (field.hasError('maxlength')) {
        return this.erroresContrasenna.maxlength;
      }
      if (field.hasError('pattern')) {
        return this.erroresContrasenna.pattern;
      }
      if (field.hasError('notEqual')) {
        return this.erroresContrasenna.notEqual;
      }
    }
    return '';
  }

  getErrorMessage(fieldName: string): string {
    const field = this.cambioDatosForm.get(fieldName);
    if(field){
      if (field.hasError('required')) {
        return this.erroresCampos.required;
      }
    }
    return '';
  }

  submitFormContrasenna() {
    if (this.cambioContrasenaForm.invalid) {
      return;
    }
    const nuevaContrasena = this.cambioContrasenaForm.value.nuevaContrasena;
    const confirmarContrasena = this.cambioContrasenaForm.value.confirmarContrasena;
  
    
  }

  submitFormCambios() {
    if (this.cambioDatosForm.invalid) {
      return;
    }
    const usuario = this.cambioDatosForm.value.usuario;
    const nombre = this.cambioDatosForm.value.nombre;
    const apellidos = this.cambioDatosForm.value.apellidos;
  
  }
}
