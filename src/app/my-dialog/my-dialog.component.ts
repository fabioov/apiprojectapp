import { Component } from '@angular/core';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {
  constructor() { }

  onNoClick(): void {
    // code to handle the cancel button click
  }

  onYesClick(): void {
    // code to handle the confirm button click
  }
}
