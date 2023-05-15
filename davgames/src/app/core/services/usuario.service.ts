import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>{
    let url = "http://localhost:8080/v0/davgames/api/admin/usuarios";
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("token")}`);

    return this.http.get<any>(url, { headers, observe: 'response' }).pipe(
      map((response) => {
        if (response.body) {
          console.log(response.body)
          return response.body;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }
}
