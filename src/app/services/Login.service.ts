import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user';
import Response from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  private readonly baseURL = 'http://localhost:5157/users/login';
  private accessToken = localStorage.getItem('Bearer');
  private tokenType = `Bearer ${this.accessToken}`;

  constructor(private httpClient: HttpClient) {}

  Login(login: User): Observable<Response> {
    const url = this.baseURL;
    const headers = new HttpHeaders().set('Authorization', this.tokenType);
    const options = { headers: headers };
    console.log("URL : " , url , "Login" , login , "options" , options);
    return this.httpClient.post<Response>(url, login, options);
  }
}
