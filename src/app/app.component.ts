import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './data.service';
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

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {}

  logInOnClick() {
    console.log('LogIn button working fine!');
    this.openDialog();
  }

  signUpOnClick() {
    debugger;
    this.symbol = 'AAPL';
    console.log('SingUp button working fine!');
    this.dataService.getCompanyProfile(this.symbol).subscribe((search: any) => {
      console.log('Received Company Profile data:', search);
      this.companyProfile = search;
    });
    this.dataService.getSymbolList(this.symbol).subscribe((search: any) => {
      console.log('Received Symbol data:', search);
      this.symbolList = search;
    });

    this.dataService.getStockPrices(this.symbol).subscribe((search: any) => {
      console.log('Received Stock data:', search);
      this.stockPrices = search;
    });

    this.fromDate = '2023-01-01';
    this.toDate = '2023-04-01';
    this.dataService.getCompanyNews(this.symbol, this.fromDate, this.toDate).subscribe((search: any) => {
      console.log('Received Company News:', search);
      this.companyNews = search;
    });
    debugger;
  }
}
