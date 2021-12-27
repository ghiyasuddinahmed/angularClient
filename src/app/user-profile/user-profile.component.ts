import { Component, OnInit } from '@angular/core';
import {StoreDataService} from "../services/store-data.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public data: { name: string; email: string, _id: string };
  constructor(private tokenStore: StoreDataService) {
    this.data= {
      name: "",
      email: "",
      _id: ""
    }
  }

  ngOnInit(): void {
    this.tokenStore.loadUser()
    this.data = {
      name: this.tokenStore.user.name,
      email: this.tokenStore.user.email,
      _id: this.tokenStore.user._id
    }
  }


}
