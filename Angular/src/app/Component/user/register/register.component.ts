import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OuthService } from '../../Services/outh.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  constructor(private fb: FormBuilder, private httpApiService: OuthService) { }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Password: ['', [Validators.required]],
        ConfirmPassword: ['', [Validators.required]],
        Address: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]]
      })
  }

  Register() {
    console.log(this.RegisterForm.value)
    this.httpApiService.Register(this.RegisterForm.value).subscribe(
      (res) => { console.log(res); window.location.href = "/User/Login"; },
      (err) => { console.log(err) }
    );
  }

}
