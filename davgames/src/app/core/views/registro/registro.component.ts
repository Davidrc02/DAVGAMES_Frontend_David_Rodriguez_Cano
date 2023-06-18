import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm!: FormGroup;
  formSubmitted: boolean = false;

  ccaa = ["Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla y León", "Castilla-La Mancha",
    "Cataluña", "Extremadura", "Galicia", "La Rioja", "Madrid", "Murcia", "Navarra", "País Vasco", "Valencia"];
  erroresRegistro: any = {
    required: 'El campo es requerido',
    minlength: 'La contraseña debe tener al menos 8 caracteres',
    maxlength: 'La contraseña no puede tener más de 16 caracteres',
    pattern: 'La contraseña debe contener al menos una letra minúscula y una letra mayúscula',
    notEqual: 'Las contraseñas no coinciden'
  };
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      comunidadAutonoma: ['', Validators.required],
      email: ['', Validators.required],
      fechaNac: ['', Validators.required],
      contrasenna: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/)]],
      confirContrasenna: ['', Validators.required]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registroForm.get(fieldName);
    if (field) {
      if (field.hasError('required')) {
        return this.erroresRegistro.required;
      }
      if (field.hasError('minlength')) {
        return this.erroresRegistro.minlength;
      }
      if (field.hasError('maxlength')) {
        return this.erroresRegistro.maxlength;
      }
      if (field.hasError('pattern')) {
        return this.erroresRegistro.pattern;
      }
      if (field.hasError('notEqual')) {
        return this.erroresRegistro.notEqual;
      }
    }
    return '';
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

  onSubmit(): void {
    this.formSubmitted=true;

    if (this.registroForm.invalid) {
      return;
    }

    const usuario:Usuario = {
      nombre: this.registroForm.value.nombre,
      username: this.registroForm.value.username,
      apellidos: this.registroForm.value.apellidos,
      comunidadAutonoma: this.registroForm.value.comunidadAutonoma,
      email: this.registroForm.value.email,
      fechaNac: this.registroForm.value.fechaNac,
      password: this.registroForm.value.contrasenna,
      facturas: [],
      saldo: 1000000
    }
    this.authService.register(usuario).subscribe(response => {
      Swal.fire({
        title: 'Te has registrado de forma satisfactoria',
        icon: 'info',
        confirmButtonColor: 'goldenrod',
        background:'#474747',
        color:'#ffffff',
        confirmButtonText: 'OK',
      })
      this.router.navigate(["/login"])
    })
  }

}
