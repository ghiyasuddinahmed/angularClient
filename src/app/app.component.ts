import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {StoreDataService} from "./services/store-data.service";
import {RestapidataService} from "./services/restapidata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularClient';
  status = 'DOWN';
  current_route: string = '';

  constructor(private router: Router, private tokenStore: StoreDataService, private restApiDataService: RestapidataService) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.current_route = this.router.url;
        }
      }
    );
  }

  ngOnInit() {
    this.current_route = this.router.url;
  }

  onLogout(){
    this.tokenStore.logout()
    localStorage.clear()
  }

  updateProfile(){

  }

  deleteProfile(){
    this.restApiDataService.delete()
      .then((response: any) => {
        try{
          if (response){
            console.log(response)
            if (response.deleted){
              this.tokenStore.logout()
              localStorage.clear()
              const navigationDetails: string[] = ['/login'];
              this.router.navigate(navigationDetails)
              alert("Deleted successfully")
            }
          }else{
            alert("Unable to delete")
          }
        }catch(e){
          alert("Unable to delete account, please try again later")
        }

      })
  }

}
