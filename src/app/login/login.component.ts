import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapidataService } from '../services/restapidata.service';
import { StoreDataService } from '../services/store-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private restApiService: RestapidataService,
    private storeDataService: StoreDataService,
    private router: Router
  ) {}

  login() {
    let body = { email: this.email, password: this.password };

    this.restApiService.post(body, 'login').subscribe((token) => {
      if (token) {
        this.storeDataService.storeToken(token);
      }
    });
  }

  ngOnInit(): void {}
}
