import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OuthService {

  constructor(private HttpClientService: HttpClient) { }

  Register(form) {
    return this.HttpClientService.post(`${environment.API_URL}/api/Account/Registeration`, form)
  }

  Login(form) {
    const httpOption =
    {
      headers: new HttpHeaders({
        "Content-type": "application/x-www-form-urlencoded"
        //'Authorization': 'Bearer ' +localStorage.getItem("access_token")
      })
    };
    //form.append('grant_type',"password")
    return this.HttpClientService.post(`${environment.API_URL}/Login`, { form, grant_type: "password" }, httpOption);
  }

  LoggedIn() {
    return !!localStorage.getItem('access_token')
  }

  LoggOff() {
    localStorage.removeItem('access_token');
    window.location.href = "/Home";
  }

}
