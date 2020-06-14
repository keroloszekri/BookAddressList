import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDepartment } from '../ViewModel/idepartment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private HttpClientService: HttpClient) { }

  GetAll(): Observable<IDepartment[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    console.log(this.HttpClientService.get<IDepartment[]>(`${environment.API_URL}/api/Departments`));
    return this.HttpClientService.get<IDepartment[]>(`${environment.API_URL}/api/Departments`, httpOption);
  }

  AddDepartment(Prd: IDepartment): Observable<IDepartment> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.post<IDepartment>(`${environment.API_URL}/api/Departments`, Prd, httpOption)
  }

  getOneProduct(id: any): Observable<IDepartment> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    console.log(this.HttpClientService.get<IDepartment>(`${environment.API_URL}/api/Departments/${id}`, httpOption));
    return (this.HttpClientService.get<IDepartment>(`${environment.API_URL}/api/Departments/${id}`, httpOption));
  }

  Edit(ID :number, Dept:IDepartment): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.put(`${environment.API_URL}/api/Departments/${ID}`, Dept, httpOption).pipe();
  }

  Delete(ID :number): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.delete(`${environment.API_URL}/api/Departments/${ID}`, httpOption);
  }
}
