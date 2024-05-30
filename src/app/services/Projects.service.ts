import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import projects from "../models/project";
import Projects from "../models/project";
import { Observable } from "rxjs";
import Response from "../models/response";

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private readonly baseURL = 'http://localhost:5157/projects';
    private readonly uploadURL = 'http://localhost:5157/FileUpload';
    private readonly projectfile = 'http://localhost:5157/'
    private accessToken = localStorage.getItem('Bearer');
    private tokenType = `Bearer ${this.accessToken}`;
    constructor(private httpClient: HttpClient) {}
    public SelecetOption = ""
  

    GetAll() {
      const headers = new HttpHeaders().set('Authorization', this.tokenType);
      const options = { headers: headers };
      return this.httpClient.get<projects[]>(`${this.baseURL}`,options);
    
    }

    GetProjectID(id : number|string) : Observable<Response>{
      const headers = new HttpHeaders({
        'Authorization': this.tokenType,
        'Content-Type': 'application/json'
      });
      const options = { headers: headers };
      return this.httpClient.get<Response>(`${this.baseURL}/GetBy/${id}`,options)    
    }

    UpdateProjectRequest(project : Projects , files: File[]) : Observable<Response> {
      const formData: FormData = new FormData();
      formData.append('ProjectUpdate.Id',project.id.toString())
      formData.append('ProjectUpdate.Name', project.name);
      formData.append('ProjectUpdate.OwnerId', project.ownerId.toString());

      if(project.detail == null){
        project.detail = ""
      }
      formData.append('ProjectUpdate.Detail', project.detail);
      formData.append('ProjectUpdate.StartDate', project.startDate.toString());
      formData.append('ProjectUpdate.EndDate',  project.endDate.toString());
      formData.append('ProjectUpdate.Activities', JSON.stringify(project.activities));
      formData.append('ProjectUpdate.ProjectXfiles', JSON.stringify(project.projectXfiles));
      files.forEach((file) => {
          formData.append('Files', file , file.name);
      });
      const headers = new HttpHeaders({
        'Authorization': this.tokenType,
      });
      const options = { headers: headers };
      return this.httpClient.put<Response>(`${this.baseURL}/UpdateProject`,formData,options)  
    }

    Create(project: Projects, files: File[]): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('ProjectCreate.Name', project.name);
      formData.append('ProjectCreate.OwnerId', project.ownerId.toString());
      if(project.detail == null){
        project.detail = ""
      }
      formData.append('ProjectCreate.Detail', project.detail);
      formData.append('ProjectCreate.StartDate', project.startDate.toString());
      formData.append('ProjectCreate.EndDate',  project.endDate.toString());
      formData.append('ProjectCreate.Activities', JSON.stringify(project.activities));
      console.log(JSON.stringify(project.activities));
      formData.append('ProjectCreate.projectXfiles', project.projectXfiles.toString());

      
      files.forEach((file) => {
          formData.append('Files', file , file.name);
      });
  
      const headers = new HttpHeaders({
          'Authorization': this.tokenType,
      });
  
      const options = { headers: headers };
      return this.httpClient.post<any>(`${this.baseURL}/CreateProject`, formData, options);
  }
  

      Delete(id : number|string){
      const headers = new HttpHeaders({
        'Authorization': this.tokenType,
        'Content-Type': 'application/json'
      });
      const options = { headers: headers };
      return this.httpClient.delete<projects[]>(`${this.baseURL}?id=${id}`,options);
    }
    // UPLOAD FILE PART
     GetProjectFiles(id : number|string): Observable<Response>{
      const headers = new HttpHeaders({
        'Authorization': this.tokenType,
      });
      const options = { headers: headers };
      return this.httpClient.get<Response>(`${this.projectfile}/GetBy/${id}`,options);
     }

     DownloadFile(id : number|string): Observable<Blob>{
      const url = `http://localhost:5157/FileDownload/DownloadFile/${id}`;
      return this.httpClient.get(url, { responseType: 'blob' });
     }
  }
    // ***END HERE
    // (method) HttpClient.get<projects[]>(url: string, options?: {
    // headers?: HttpHeaders | {[header: string]: string | string[]; } | undefined;
