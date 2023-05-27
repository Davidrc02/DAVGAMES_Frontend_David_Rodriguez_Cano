import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  nombre!:string | null;
  roles : string[] = [];
  token!:string | null;

  constructor(private http: HttpClient) {
    this.token=localStorage.getItem("token")
    if(this.token){
      this.obtenerDatos(this.token)
    }
  }
  
  login(usernameOrEmail: string, password:string): Observable<any> {
    const url = 'http://localhost:8080/v0/davgames/auth/login';
    const body = {
        usernameOrEmail:usernameOrEmail,
        password:password
    };
    return this.http.post<any>(url, body).pipe(
        tap(response => {
          this.token= response.tokenDeAcceso;
          if(this.token){
            this.obtenerDatos(this.token)
            localStorage.setItem('token', this.token);
          }
      })
    );
  }

  register(usuario: Usuario): Observable<any> {
    const url = 'http://localhost:8080/v0/davgames/auth/register';
    const body = usuario;
    return this.http.post<any>(url, body).pipe(
        tap(response => {
          return response.mensaje
      })
      );
  }

  obtenerDatos(token:string){
    var tokenVerificado = this.verifyToken(token);
    if(tokenVerificado){
      let nueva:any = jwtDecode(token)
      this.nombre = nueva.sub;
      this.roles = nueva.roles;
      this.roles = nueva.roles.map((rol:any) => rol.authority);
    }
  }

  verifyToken(token:string| null): Observable<boolean> {
    if(!token){
      token=""
    }
    const url = 'http://localhost:8080/v0/proyectoJWT/auth/verifyToken';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get<any>(url, httpOptions);
  }

  isAdmin():boolean{
    if(this.roles.length==0){
      let token = localStorage.getItem("token");
      if(token){
        this.obtenerDatos(token);
      }
    }
    return this.roles.includes("ROLE_ADMIN") 
  }

  isAuth():boolean{
    if(this.roles.length==0){
      let token = localStorage.getItem("token");
      if(token){
        this.obtenerDatos(token);
      }
    }
    return this.roles.includes("ROLE_USER") 
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    this.roles=[]
    this.nombre=null;
    this.token=null
  }

  get nombreValue(){
    let token = localStorage.getItem("token")
    if(token){
      this.obtenerDatos(token);
      return this.nombre;
    }
    return null  
  }
}
