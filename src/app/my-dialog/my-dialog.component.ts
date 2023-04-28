import { Component, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
})
export class MyDialogComponent {
  isSignUp: boolean = false;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.isSignUp = data.isSignUp;
    } else {
      this.isSignUp = false; // default value if data is null
    }
  }

  ngOnInit() {}

  onNoClick(): void {
    // code to handle the cancel button click
  }

  onYesClick(): void {
    // code to handle the confirm button click
  }
}
