import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getQuery(url) {
  	return this.http.get(url);
  }

  getUsers(page) {
  	return this.getQuery(`https://reqres.in/api/users?page=1&per_page=12`).pipe(map(data => {
      return data;
    }));
  }

  setUser() {
    
  }

  getUser(id) {
  	return this.getQuery(`https://reqres.in/api/users/${id}`).pipe(map(data => {
      return data;
    }));
  }
}
