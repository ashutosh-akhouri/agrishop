import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  saveNewUser(usr){
    return this.http.post('/users', usr);
  }

  getAllUsers(){
    return this.http.get('/users');
  }

}
