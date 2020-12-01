import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) { }

  postUser() {
  	const headers = {
      'email' : "example@gmail.com",
      'password': "hola"
    };
  	return this.http.post<any>('https://reqres.in/api/register', "",{headers});
  }
}
