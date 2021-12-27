import { Component, OnInit } from '@angular/core';
import { RestapidataService } from '../services/restapidata.service';
import { StoreDataService } from '../services/store-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public data: { password: string; email: string };
  constructor(private restapidataService : RestapidataService, private tokenStore: StoreDataService, private router: Router) {
    this.data = {
      email: "",
      password: ""
    };
  }

  ngOnInit(): void {
  }

  loadUser(){
    //get user from token
    this.restapidataService
      .get()
      .then((user: any) => {
        const creds = {"name": user.name, "email": user.email, "_id": user._id}
        this.tokenStore.storeUser(JSON.stringify(creds))
        console.log("User: ", user)
        if (user){
          this.router.navigateByUrl('/profile')
        }
      })
  }

  login(){
    if (this.tokenStore.authToken == "null" || this.tokenStore.authToken == null){
      const email = this.data.email
      const password = this.data.password
      this.restapidataService.post(JSON.stringify({email, password}), "login")
        .then((token: any) => {
          try{
            if (token){
              console.log("Token: ",token)
              this.tokenStore.storeToken(token.token)
              this.loadUser()
            }
          }catch(e){
            alert("User does not exist, please try again with valid credentials.")
          }
        })
      return
    }
    this.loadUser()
  }
}
