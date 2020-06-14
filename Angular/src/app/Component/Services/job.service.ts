import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IJob } from '../ViewModel/ijob';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private HttpClientService: HttpClient) { }

  GetAll(): Observable<IJob[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    console.log(this.HttpClientService.get<IJob[]>(`${environment.API_URL}/api/Jobs`));
    return this.HttpClientService.get<IJob[]>(`${environment.API_URL}/api/Jobs`, httpOption);
  }

  AddJob(Prd: IJob): Observable<IJob> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.post<IJob>(`${environment.API_URL}/api/Jobs`, Prd, httpOption)
  }

  getOneProduct(id: any): Observable<IJob> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    console.log(this.HttpClientService.get<IJob>(`${environment.API_URL}/api/Jobs/${id}`, httpOption));
    return (this.HttpClientService.get<IJob>(`${environment.API_URL}/api/Jobs/${id}`, httpOption));
  }

  Edit(ID :number, Dept:IJob): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.put(`${environment.API_URL}/api/Jobs/${ID}`, Dept, httpOption).pipe();
  }

  Delete(ID :number): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.delete(`${environment.API_URL}/api/Jobs/${ID}`, httpOption);
  }
}
