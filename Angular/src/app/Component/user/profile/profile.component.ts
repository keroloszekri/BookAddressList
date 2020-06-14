import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../ViewModel/iperson';
import { ProfileService } from '../../Services/profile.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../Services/api.service';
import { IDepartment } from '../../ViewModel/idepartment';
import { IJob } from '../../ViewModel/ijob';
import { DepartmentService } from '../../Services/department.service';
import { JobService } from '../../Services/job.service';
import * as XLSX from 'xlsx';
import { PassingService } from '../../Services/passing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  EditForm: FormGroup;
  selectFile: File = null;
  ListPeople: IPerson[]=[];
  URL: string = `${environment.API_URL}`;
  EditPerson: IPerson = { Img: "", Address: "", Age: 0, Date: Date.now.toString(), Department: "", Email: "", Job: "", Name: "", Phone: "" };
  EditdeForm: FormGroup;
  ListDepartment: IDepartment[];
  ListJob: IJob[];
  searchText: string;
  Message: string;
  constructor(private ProfileService: ProfileService, private ApiService: APIService, private fb: FormBuilder, private departmentService: DepartmentService, private jobService: JobService , private CartService: PassingService) { }

  ngOnInit(): void {
    this.ProfileService.GetProfile().subscribe(
      (res) => {
        //console.log(res);
        this.ListPeople = res;
        this.CartService.CurrentMessage.subscribe(response => this.Message = response);
        this.CartService.ChangeCart(this.ListPeople.length.toString());
        console.log(this.ListPeople)
      },
      (err) => { console.log(err) });

    this.EditdeForm = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Job: ['', [Validators.required]],
        Department: ['', [Validators.required]],
        Phone: ['', [Validators.required, Validators.pattern(/^01(0|1|2|5)\d{8}$/i)]],
        Date: ['', [Validators.required]],
        Address: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Age: ['', [Validators.required]],
        Img: ['', [Validators.required]],
      });

    this.departmentService.GetAll().subscribe(
      (res) => {
        //console.log(res);
        this.ListDepartment = res;
        console.log(this.ListDepartment)
      },
      (err) => { console.log(err) });

    this.jobService.GetAll().subscribe(
      (res) => {
        //console.log(res);
        this.ListJob = res;
        console.log(this.ListJob)
      },
      (err) => { console.log(err) });

  }

  public onFileSelected(event) {
    this.selectFile = <File>event.target.files[0];
  }

  GitOneProduct(ID: number) {
    this.ApiService.getOneProduct(ID).subscribe(
      (res) => { console.log(res); this.EditPerson = res },
      (err) => { console.log(err) }
    );
  }

  EditProduct() {
    //console.log("Erom edit "+this.EditForm.value);
    this.ApiService.Edit(this.EditPerson.ID, this.EditPerson, this.selectFile, this.selectFile.name).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => { console.log(err) }
    );

  }

  DeleteProduct() {
    this.ApiService.Delete(this.EditPerson.ID).subscribe(
      (res) => { console.log(res); this.ngOnInit() },
      (err) => { console.log(err) }
    );

  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    console.log(ws);

    /* hide first column */
    ws['!cols'] = [];
    ws['!cols'][0] = { hidden: true };



    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  public get sortedArray(): IPerson[] {
    return this.ListPeople.sort((a, b) => (a.Date > b.Date) ? 1 : -1)

    console.log( this.ListPeople);
  }

 

}


