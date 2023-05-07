import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { HotToastService } from '@ngneat/hot-toast';



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

  constructor(private dataService: DataService, public authService: AuthService, public dialog: MatDialog, private toast: HotToastService) {

  }

  ngOnInit(): void {

  }

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

  }

  signOutOnClick() {
debugger
console.log("button");
    this.authService.isSignedIn = false;
    
  }
}
