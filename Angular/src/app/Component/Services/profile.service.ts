import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../ViewModel/iuser';
import { environment } from 'src/environments/environment';
import { IPerson } from '../ViewModel/iperson';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private HttpClientService: HttpClient) { }

  GetUserInfo(): Observable<IUser> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.get<IUser>(`${environment.API_URL}/api/Account/GetUser`, httpOption)
  }

  GetProfile(): Observable<IPerson[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    //console.log(this.HttpClientService.get<IDepartment[]>(`${environment.API_URL}/department`));
    return this.HttpClientService.get<IPerson[]>(`${environment.API_URL}/api/Profile`, httpOption);
  }
}
