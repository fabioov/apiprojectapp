import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import * as moment from 'moment';
import { from } from 'rxjs';

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

  constructor(private dataService: DataService, public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: { isSignUp:   this.isSignUp,
              isSignedIn: this.isSignedIn }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }

  logInOnClick() {
    this.isSignUp = false;
    console.log('LogIn button working fine!');
    this.openDialog();
  }

  signUpOnClick() {
    this.isSignUp = true;
    debugger;

    this.openDialog();

    // this.symbol = 'AAPL';
    // console.log('SingUp button working fine!');
    // this.dataService.getCompanyProfile(this.symbol).subscribe((search: any) => {
    //   console.log('Received Company Profile data:', search);
    //   this.companyProfile = search;
    // });
    // this.dataService.getSymbolList(this.symbol).subscribe((search: any) => {
    //   console.log('Received Symbol data:', search);
    //   this.symbolList = search;
    // });

    // this.dataService.getStockPrices(this.symbol).subscribe((search: any) => {
    //   console.log('Received Stock data:', search);
    //   this.stockPrices = search;
    // });

    // this.fromDate = '2023-01-01';
    // this.toDate = '2023-04-01';
    // this.dataService.getCompanyNews(this.symbol, this.fromDate, this.toDate).subscribe((search: any) => {
    //   console.log('Received Company News:', search);
    //   this.companyNews = search;
    // });
    // debugger;
  }

  signOutOnClick() {
debugger
console.log("button");
    this.authService.isSignedIn = false;
    
  }
}
