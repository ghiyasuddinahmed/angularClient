import { Component, OnInit } from '@angular/core';
import {RestapidataService} from "../services/restapidata.service";
import {StoreDataService} from "../services/store-data.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public data: { name: string; email: string };
  constructor(private restApiDataService: RestapidataService, private tokenStore: StoreDataService, private router: Router) {
    this.data = {
      name: "",
      email: "",
    };
  }

  ngOnInit(): void {
    this.tokenStore.loadUser()
    this.data = {
      name: this.tokenStore.user.name,
      email: this.tokenStore.user.email,
    }
  }

  validate(): boolean{
    // Some validation checks
    if (this.data.name.length >= 4 && this.data.email.length >= 10){
      return true;
    }
    return false;
  }

  update(){
    if (this.validate()){
      const name = this.data.name
      const email = this.data.email
      this.restApiDataService.put(JSON.stringify({name, email}))
        .then((result: any) => {
          if ("updated" in result){
            if (result.updated){
              const creds = {"name": this.data.name, "email": this.data.email, "_id": this.tokenStore.user._id}
              this.tokenStore.storeUser(JSON.stringify(creds))
              const navigationDetails: string[] = ['/profile'];
              this.router.navigate(navigationDetails)
              alert("Profile updated")
            }
          }
        })
    }
  }

}
