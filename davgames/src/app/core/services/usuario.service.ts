import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: Usuario[] = [];
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>{
    let url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/usuarios";
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    return this.http.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        if (response.body) {
          this.usuarios=response.body;
          return response.body;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  getUsuario(id: number): Observable<any> {
    let url = `http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/usuarios/${id}`;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);
  
    return this.http.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        if (response.body) {
          return response.body;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }  

  obtenerUsuario(id:number):Observable<any>{
    if(this.usuarios.length!=0)
      return of(this.usuarios.find(usuario => usuario.id === id));
    else{
      return this.getUsuario(id);
    }
  }

  crearUsuario(usuario: Usuario): Observable<any>{
    let url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/usuarios";
    const body = usuario;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    return this.http.post<any>(url, body, { headers, observe: 'response' }).pipe(
      map((response) => {
        if (response.body) {
          return response.body;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  editarUsuario(usuario: Usuario): Observable<any>{
    let url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/usuarios/"+usuario.id;
    const body = usuario;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    return this.http.put<any>(url, body, { headers, observe: 'response'}).pipe(
      map((response) => {
        if (response.body) {
          return response.body;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  eliminarUsuario(id: number): Observable<any>{
    let url = "http://localhost:8080/DAVGAMES_Backend/v0/davgames/api/usuarios/"+id;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    return this.http.delete<any>(url, {headers, observe: 'response'}).pipe();
  }
}
