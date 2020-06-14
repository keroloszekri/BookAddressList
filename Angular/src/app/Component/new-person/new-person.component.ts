import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { DepartmentService } from '../Services/department.service';
import { IDepartment } from '../ViewModel/idepartment';
import { JobService } from '../Services/job.service';
import { IJob } from '../ViewModel/ijob';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  InsertForm: FormGroup;
  selectFile: File = null;
  imageURL: string;
  ListDepartment: IDepartment[];
  ListJob : IJob[];
  constructor( private PersonService: APIService, private fb: FormBuilder , private DepartmentService :DepartmentService , private JobService  :JobService ) { }

  ngOnInit(): void 
  {
    this.InsertForm = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Job: ['', [Validators.required]],
        Department: ['', [Validators.required]],
        Phone: ['', [Validators.required,Validators.pattern(/^01(0|1|2|5)\d{8}$/i)]],
        Date: ['', [Validators.required]],
        Address: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Age: ['', [Validators.required]],
        Img : ['', [Validators.required]],

      }
    );

    this.DepartmentService.GetAll().subscribe(
      (res) => {
        //console.log(res);
        this.ListDepartment = res;
        console.log(this.ListDepartment)
      },
      (err) => { console.log(err) });

      this.JobService.GetAll().subscribe(
        (res) => {
          //console.log(res);
          this.ListJob = res;
          console.log(this.ListJob)
        },
        (err) => { console.log(err) });

  }

  public onFileSelected(event) {
    //console.log(event.target.files[0]);
    this.selectFile = <File>event.target.files[0];
  }

  Add() {
    this.PersonService.AddPerson(this.InsertForm.value, this.selectFile, this.selectFile.name).subscribe(
      (res) => { console.log(res); window.location.href = "/Home" },
      (err) => { console.log(err) }
    );
  }

}
