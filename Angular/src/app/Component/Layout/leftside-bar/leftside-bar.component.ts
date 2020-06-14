import { Component, OnInit } from '@angular/core';
import { OuthService } from '../../Services/outh.service';
import { ProfileService } from '../../Services/profile.service';
import { IUser } from '../../ViewModel/iuser';
import { PassingService } from '../../Services/passing.service';

@Component({
  selector: 'app-leftside-bar',
  templateUrl: './leftside-bar.component.html',
  styleUrls: ['./leftside-bar.component.css']
})
export class LeftsideBarComponent implements OnInit {

  user: IUser = { Name: "", Address: "", Email: "" };
  TextSearch : string ;
  constructor(public LoggedService: OuthService ,  private profileService: ProfileService , private CartService: PassingService) { }

  ngOnInit(): void {
    this.profileService.GetUserInfo().subscribe(
      (res) => { this.user = res; },
      (err) => { console.log(err) }
    );
  }

  ChangeSearch(): void
  {
    console.log(this.TextSearch);
    //this.CartService.CurrentMessage2.subscribe(response => this.TextSearch = response);
    this.CartService.ChangeSearch(this.TextSearch);
  }

}
