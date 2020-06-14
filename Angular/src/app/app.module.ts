import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/Layout/header/header.component';
import { LeftsideBarComponent } from './Component/Layout/leftside-bar/leftside-bar.component';
import { RightSideBarComponent } from './Component/Layout/right-side-bar/right-side-bar.component';
import { ContentComponent } from './Component/Layout/content/content.component';
import { FooterComponent } from './Component/Layout/footer/footer.component';
import { DataComponent } from './Component/Layout/data/data.component';
import { HttpClientModule } from '@angular/common/http';
import { NewPersonComponent } from './Component/new-person/new-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './Component/department/department.component';
import { JobComponent } from './Component/job/job.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftsideBarComponent,
    RightSideBarComponent,
    ContentComponent,
    FooterComponent,
    DataComponent,
    NewPersonComponent,
    DepartmentComponent,
    JobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
