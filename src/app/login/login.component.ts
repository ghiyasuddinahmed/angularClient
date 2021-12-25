import { Component, OnInit } from '@angular/core';
import { RestapidataService } from '../services/restapidata.service';
import { StoreDataService } from '../services/store-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public data: { password: string; email: string };
  constructor(private restapidataService : RestapidataService, private tokenStore: StoreDataService) {
    this.data = {
      email: "",
      password: ""
    };
  }

  ngOnInit(): void {
    this.tokenStore.loadToken();
  }

  login(){
    if (this.tokenStore.authToken == "null" || this.tokenStore.authToken == null){
      const email = this.data.email
      const password = this.data.password
      this.restapidataService.post(JSON.stringify({email, password}), "login")
        .then((token: any) => {
          if (token){
            console.log("Token: ",token)
            this.tokenStore.storeToken(token.token)
            //get user from token
            this.restapidataService.get()
              .then((user: any) => {
                console.log("User: ", user)
              })
          }
        })
      return
    }
    //get user from token
    this.restapidataService
      .get()
      .then((user: any) => {
        console.log("User: ", user)
      })
  }
}
