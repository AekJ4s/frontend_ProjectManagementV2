import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Response from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private readonly baseURL = 'http://localhost:5157/FileUpload';
  private accessToken = localStorage.getItem('Bearer');
  private tokenType = `Bearer ${this.accessToken}`;

  constructor(private httpClient: HttpClient) {}

  UploadFile(file : File[]): Observable<any> {
    const body = new FormData();
    file.forEach(file => body.append('formFiles',file))
    const url = this.baseURL;
    const headers = new HttpHeaders({
      'Authorization': this.tokenType,
    });
    const options = { headers: headers };
    console.log(headers);
    return this.httpClient.post<Response>(url,body,options);
  }
}
