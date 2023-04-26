import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'stock-app';

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}

  logInOnClick() {
    console.log("LogIn button working fine!");
  }

  signUpOnClick() {
    console.log("SingUp button working fine!");
  }


}

