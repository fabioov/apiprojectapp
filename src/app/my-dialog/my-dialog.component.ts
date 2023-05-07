import { Component, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
})
export class MyDialogComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  isSignUp: boolean = false;
  isSignedIn: boolean = false;
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  confirmPassControl = new FormControl('', [Validators.required]);
  username: string;
  password: string;
  confirmPass: string;
  database: any;
  hide = true;

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private auth: Auth,
    private toast: HotToastService
  ) {
    if (data) {
      this.isSignUp = data.isSignUp;
      this.isSignedIn = data.isSignedIn;
    } else {
      this.isSignUp = false; // default value if data is null
    }
  }

  ngOnInit() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyBKV7YI69io9rpQBFsduM9EttiRPm7cn34',
      authDomain: 'api-project-ddde3.firebaseapp.com',
      databaseURL: 'https://api-project-ddde3-default-rtdb.firebaseio.com',
      projectId: 'api-project-ddde3',
      storageBucket: 'api-project-ddde3.appspot.com',
      messagingSenderId: '315574655330',
      appId: '1:315574655330:web:89d92d94dc20472439f43b',
      measurementId: 'G-0T25MCE1J6',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    this.database = getDatabase(app);
  }

  async writeToDatabase() {
    try {
      await set(ref(this.database, 'users/' + this.username), {
        username: this.username,
        password: this.password,
      });
      console.log('Data written to database.');
    } catch (error) {
      console.log(error);
    }
  }

  async readFromDatabase() {
    try {
      const snapshot = await get(ref(this.database, 'users/'));
      const users = snapshot.val();
      const user = users[this.username];
      if (
        user &&
        user.username === this.username &&
        user.password === this.password
      ) {
        this.authService.isSignedIn = true;
        this.dialogRef.close();
      } else {
        this.snackBar.open(
          'Invalid username or password. Try again!',
          'Dismiss',
          {
            duration: 3000,
            panelClass: ['snack-style'],
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSignUpClick(): void {
    // code to handle the cancel button click
    debugger;
    this.toast.error('Error');
    this.dialogRef.close();
  }

  // submit() {
  //   if (this.loginForm.valid) {
  //     return;
  //   }
  //   const { email, password } = this.loginForm.value;
  //   this.authService.login(email, password).pipe(
  //     this.toast.observe({
  //       success: 'Logged in successfully',
  //       loading: 'Logging in...',
  //       error: 'There was an error'
  //     })
  //   ).subscribe(() => {
  //     this.authService.isSignedIn = true;
  //     this.dialogRef.close();
  //   })
  // }

  onLogInClick(username: string, password: string) {
    // code to handle the confirm button click
    console.log('Button is working');
    this.authService.isSignedIn = true;
    this.dialogRef.close();
  }
  logout() {

    // return from(this.auth.signOut());
  }
}
