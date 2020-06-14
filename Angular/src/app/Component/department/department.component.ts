import { Component, OnInit } from '@angular/core';
import { IDepartment } from '../ViewModel/idepartment';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../Services/department.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  ListDepartment: IDepartment[];
  Editdepartment: IDepartment = { ID: 0, Name: "" };
  URL: string = `${environment.API_URL}`;
  AddForm: FormGroup;
  EditdeForm: FormGroup;
  newDept: IDepartment;
  constructor(private APIDepartment: DepartmentService, private fb: FormBuilder) {
    this.newDept = {
      Name: '',
    }

  }

  ngOnInit(): void {
    this.APIDepartment.GetAll().subscribe(
      (res) => {
        //console.log(res);
        this.ListDepartment = res;
        console.log(this.ListDepartment)
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

  addProduct() {
    console.log(this.AddForm.controls['Name'].value);
    this.newDept.Name = this.AddForm.controls['Name'].value;
    this.APIDepartment.AddDepartment(this.newDept).subscribe(
      res => { this.newDept = res; this.ListDepartment.push(this.newDept) },
      err => console.log(err)
    )
  }

  GitOneProduct(ID: number) {
    this.APIDepartment.getOneProduct(ID).subscribe(
      (res) => { console.log(res); this.Editdepartment = res },
      (err) => { console.log(err) }
    );
  }

  EditProduct() {
    console.log(this.EditdeForm.value);
    this.APIDepartment.Edit(this.Editdepartment.ID, this.Editdepartment).subscribe(
      (res) => { console.log(res); this.ngOnInit() },
      (err) => { console.log(err) }
    );

  }

  DeleteProduct() {
    this.APIDepartment.Delete(this.Editdepartment.ID).subscribe(
      (res) => { console.log(res); this.ngOnInit() },
      (err) => { console.log(err) }
    );

  }

}
