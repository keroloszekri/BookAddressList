import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { OuthGuard } from 'src/app/Guard/outh.guard';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes =
  [
    
    { path: 'Profile', component: ProfileComponent, canActivate: [OuthGuard] },
    { path: 'Register', component: RegisterComponent },
    { path: 'Login', component: LoginComponent },
  ];


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class UserModule { }
