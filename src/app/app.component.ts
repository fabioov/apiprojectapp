import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'stock-app';
  

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

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
    console.log("LogIn button working fine!");
    this.openDialog();
  }

  signUpOnClick() {
    console.log("SingUp button working fine!");
  }


}

