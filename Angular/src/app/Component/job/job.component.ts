import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../Services/job.service';
import { IJob } from '../ViewModel/ijob';
import { IDepartment } from '../ViewModel/idepartment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  ListJob: IJob[];
  EditJob : IJob={ID:0,Name:""};
  URL : string = `${environment.API_URL}`;
  AddForm: FormGroup;
  EditdeForm: FormGroup;
  newJob:IDepartment;
  constructor(private APIJob : JobService , private fb: FormBuilder) {
    this.newJob={
      Name:'',
    }
   }

  ngOnInit(): void {
    this.APIJob.GetAll().subscribe(
      (res) => {
        //console.log(res);
        this.ListJob = res;
        console.log(this.ListJob)
      },
      (err) => { console.log(err) });

      this.AddForm = this.fb.group(
        {
          Name: ['', [Validators.required]],
        })

        this.EditdeForm = this.fb.group(
          {
            Name: ['', [Validators.required]],
          })
  }

  addProduct(){
    console.log(this.AddForm.controls['Name'].value);
    this.newJob.Name = this.AddForm.controls['Name'].value ;
    this.APIJob.AddJob(this.newJob).subscribe(
      res=>{this.newJob=res;this.ListJob.push(this.newJob)},
      err=>console.log(err)
    )
   }

  GitOneProduct(ID : number) {
    this.APIJob.getOneProduct(ID).subscribe(
      (res) => { console.log(res); this.EditJob=res },
      (err) => { console.log(err) }
    );
  }

  EditProduct() {
    console.log(this.EditdeForm.value);
    this.APIJob.Edit(this.EditJob.ID, this.EditJob).subscribe(
      (res) => { console.log(res);this.ngOnInit()},
      (err) => { console.log(err) }
    );

  }

  DeleteProduct() {
    this.APIJob.Delete(this.EditJob.ID).subscribe(
      (res) => { console.log(res);this.ngOnInit()},
      (err) => { console.log(err) }
    );

  }

}
