import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isSignUp: boolean = false;
  isSignedIn: boolean = false;

}
