import { Component, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
})
export class MyDialogComponent {
  isSignUp: boolean = false;
  isSignedIn: boolean = false;
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  confirmPassControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.isSignUp = data.isSignUp;
      this.isSignedIn = data.isSignedIn;
    } else {
      this.isSignUp = false; // default value if data is null
    }
  }

  ngOnInit() {}

  onSignUpClick(): void {
    // code to handle the cancel button click
    this.dialogRef.close();
  }

  onLogInClick(): void {
    // code to handle the confirm button click
    console.log("Button is working");
    this.authService.isSignedIn = true;
    this.dialogRef.close();
  }
}
