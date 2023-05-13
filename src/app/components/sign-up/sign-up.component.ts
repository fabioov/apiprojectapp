import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }

    return null;
  };
}

export function passwordFormatValidator(passwordErrors: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    debugger

    // const password = control.get('password')?.value;
    const password = control.value;

    console.log('Password:', password); // Log the value of the password field
    const errors: ValidationErrors = {};

    if (password && password.length < 8) {

      errors['minLength'] = 'Password must be at least 8 characters long.';
      passwordErrors.push('Password must be at least 8 characters long.');
    }

    if (password &&  !/\d/.test(password)) {
      errors['hasNumber'] = 'Password must contain at least one number.';
      passwordErrors.push('Password must contain at least one number.');
    }

    if (password &&  (!/[a-z]/.test(password) || !/[A-Z]/.test(password))) {
      errors['hasLetter'] = 'Password must contain both lowercase and uppercase letters.';
      passwordErrors.push('Password must contain both lowercase and uppercase letters.');
    }

    if (password &&  !/\W/.test(password)) {
      errors['hasSymbol'] = 'Password must contain at least one symbol.';
      passwordErrors.push('Password must contain at least one symbol.');
    }

    if (Object.keys(errors).length > 0) {
      console.log('Validation Errors:', errors); // Log the validation errors
      return errors;
    }

    return null;
  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  passwordErrors: string[] = [];
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, passwordFormatValidator(this.passwordErrors)]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: [passwordsMatchValidator(), passwordFormatValidator(this.passwordErrors)] }
  );

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    const { name, email, password } = this.signUpForm.value;
    if (!this.signUpForm.valid || !name || !email || !password) {
      return;
    }
    this.authService
      .signUp(name, email, password)
      .pipe(
        tap(() => {
          this.toast.success('User created successfully!', 'Congratulations!');
          this.router.navigate(['/home']);
        }),
        
        catchError((error) => {
          debugger;
          this.toast.error('User not created. Try again', 'Check the data!');
          return of(null);
        })
      )
      .subscribe(() => {});
  }
}
