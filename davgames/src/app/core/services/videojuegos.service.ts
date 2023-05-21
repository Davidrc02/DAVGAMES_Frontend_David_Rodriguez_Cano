import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {

  constructor(private http: HttpClient) { }

  getVideojuegos(): Observable<any>{
    let url = "http://localhost:8080/v0/davgames/api/videojuegos";
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
