import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { IPerson } from '../../ViewModel/iperson';
import { environment } from 'src/environments/environment';
import { PassingService } from '../../Services/passing.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  ListPeople: IPerson[];
  person : IPerson={Img:"",Address:"",Age:0,Date:Date.now.toString(),Department:"",Email:"",Job:"",Name:"",Phone:""};
  URL : string = `${environment.API_URL}`;
  TextSearch : string;
  constructor( private APIPerson : APIService , private CartService : PassingService) 
  { 

  }

  ngOnInit(): void 
  {
    this.APIPerson.GetAll().subscribe(
      (res) => {
        //console.log(res);
        this.ListPeople = res;
        console.log(this.ListPeople)
        
      },
      (err) => { console.log(err) });
  }

  GitOneProduct(ID : number) {
    this.APIPerson.getOneProduct(ID).subscribe(
      (res) => { console.log(res); this.person=res },
      (err) => { console.log(err) }
    );
  }

}
