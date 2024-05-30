import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user';
import Response from '../models/response';
import Activity from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly baseURL = 'http://localhost:5157/activities';
    private accessToken = localStorage.getItem('Bearer');
    private tokenType = `Bearer ${this.accessToken}`;
    constructor(private httpClient: HttpClient) {}
    public SelecetOption = ""


  // GetAllActivity(id : number): Observable<Response> {
  //   const headers = new HttpHeaders().set('Authorization', this.tokenType);
  //   const options = { headers: headers };
  //   return this.httpClient.get<Activity[]>(`${this.baseURL}/GetBy/${id}`,options);
  // }
}
