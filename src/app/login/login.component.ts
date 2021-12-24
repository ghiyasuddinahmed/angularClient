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

  constructor() {}

  ngOnInit(): void {}
}
