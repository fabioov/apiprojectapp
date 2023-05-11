import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'stock-app';

  companyProfile: any[];
  symbolList: any[];
  stockPrices: any[];
  companyNews: any[];
  symbol: any;
  fromDate: any;
  toDate: any;
  isSignUp: boolean = false;
  isSignedIn: boolean = false;

  constructor(private dataService: DataService, public authService: AuthService, private toast: ToastrService, private router: Router) {

  }

  ngOnInit(): void {

  }




  logInOnClick() {
    this.isSignUp = false;
    console.log('LogIn button working fine!');

  }

  signUpOnClick() {
    this.isSignUp = true;
    debugger;


  }

  signOutOnClick() {

    
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['landing']);
      this.toast.info('You have logged out.', 'Come back soon!')
    })
  }
}
