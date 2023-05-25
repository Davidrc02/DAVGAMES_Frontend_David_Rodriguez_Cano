import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { Videojuego } from '../interfaces/videojuego';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  videojuegos: Videojuego[] = [];

  constructor(private http: HttpClient) { }

  getVideojuegos(): Observable<any>{
    let url = "http://localhost:8080/v0/davgames/api/videojuegos";
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

  getVideojuego(nombreVideojuego: string, consola:string): Observable<any> {
    let url = "http://localhost:8080/v0/davgames/api/videojuegos/"+nombreVideojuego+"/"+consola;
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

  obtenerVideojuego(nombreVideojuego: string, consola:string):Observable<any>{
    if(this.videojuegos.length!=0)
      return of(this.videojuegos.find(videojuego => videojuego.nombreVideojuego === nombreVideojuego && videojuego.nombreConsola === consola));
    else{
      return this.getVideojuego(nombreVideojuego, consola);
    }
  }

  crearVideojuego(videojuego: Videojuego): Observable<any>{
    let url = "http://localhost:8080/v0/davgames/api/videojuegos";
    const body = videojuego;
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

  editarVideojuego(videojuego: Videojuego): Observable<any>{
    let url = "http://localhost:8080/v0/davgames/api/videojuegos/"+videojuego.nombreVideojuego+"/"+videojuego.nombreConsola;
    const body = videojuego;
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

  eliminarVideojuego(nombreVideojuego: string, consola:string): Observable<any>{
    let url = "http://localhost:8080/v0/davgames/api/videojuegos/"+nombreVideojuego+"/"+consola;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    return this.http.delete<any>(url, {headers, observe: 'response'}).pipe();
  }
}
