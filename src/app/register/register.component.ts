import { Component, OnInit } from '@angular/core';
import { RestapidataService } from '../services/restapidata.service';
import { StoreDataService } from '../services/store-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public data: { name: string; password: string; confirm_password: string; email: string };

  constructor(private restApiDataService: RestapidataService, private tokenStore: StoreDataService) {
    this.data = {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  }
  ngOnInit(): void {
  }

  validate(): boolean{
    // Some validation checks
    if (this.data.name.length >= 4 && this.data.email.length >= 10 && this.data.password.length >= 5 && this.data.password.length >= 5){
      if (this.data.password == this.data.confirm_password){
        return true;
      }
    }
    return false;
  }

  register(){
    if (this.validate()){
      const name = this.data.name
      const email = this.data.email
      const password = this.data.password
      alert(this.data.name+" "+this.data.email+" "+this.data.password)
      this.restApiDataService.post(JSON.stringify({name, email, password}), 'register')
        .then((result: any) => {
          if (result.token){
            this.tokenStore.storeToken(result.token)
          }
        })
    }
  }
}
