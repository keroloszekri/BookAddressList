import { Component, OnInit } from '@angular/core';
import { OuthService } from '../../Services/outh.service';
import { ProfileService } from '../../Services/profile.service';
import { IUser } from '../../ViewModel/iuser';
import { PassingService } from '../../Services/passing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: IUser = { Name: "", Address: "", Email: "" };
  CountProduct: string;

  constructor(public LoggedService: OuthService, private ProfileService: ProfileService , private CartService: PassingService) { }

  ngOnInit(): void {

    this.ProfileService.GetUserInfo().subscribe(
      (res) => { this.user = res;
        this.CartService.CurrentMessage.subscribe(response => this.CountProduct = response);
      },
      (err) => { console.log(err) }
    );
  }



}
