import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPerson } from '../ViewModel/iperson';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private HttpClientService: HttpClient) { }

  GetAll(): Observable<IPerson[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    //console.log(this.HttpClientService.get<IPerson[]>(`${environment.API_URL}/People`));
    return this.HttpClientService.get<IPerson[]>(`${environment.API_URL}/api/People`, httpOption);
  }

  AddPerson(person, selectedFile, selectedFileName) {
    console.log(person)
    //console.log(Comp.ID)
    const formData = new FormData();
    //formData.append('ID', Comp.ID);
    formData.append('Name', person.Name);
    formData.append('Job', person.Job);
    formData.append('Department', person.Department);
    formData.append('Phone', person.Phone);
    formData.append('Date', person.Date);
    formData.append('Address', person.Address);
    formData.append('Email', person.Email);
    formData.append('Age', person.Age);
    formData.append('Img', selectedFile, selectedFileName);

    console.log("formData i Add Product");
    console.log(formData);
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.post(`${environment.API_URL}/api/People`, formData, httpOption);
  }

  getOneProduct(id: any): Observable<IPerson> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    console.log(this.HttpClientService.get<IPerson>(`${environment.API_URL}/api/People/${id}`, httpOption));
    return (this.HttpClientService.get<IPerson>(`${environment.API_URL}/api/People/${id}`, httpOption));
  }

  Delete(ID): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.delete(`${environment.API_URL}/api/People/${ID}`, httpOption).pipe();
  }

  Edit(ID, person, selectedFile, selectedFileName): Observable<{}> {
    const formData = new FormData();
    formData.append('Name', person.Name);
    formData.append('Job', person.Job);
    formData.append('Department', person.Department);
    formData.append('Phone', person.Phone);
    formData.append('Date', person.Date);
    formData.append('Address', person.Address);
    formData.append('Email', person.Email);
    formData.append('Age', person.Age);
    formData.append('Img', selectedFile, selectedFileName);

    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.put(`${environment.API_URL}/api/People/${ID}`, formData, httpOption).pipe();
  }

  
}
