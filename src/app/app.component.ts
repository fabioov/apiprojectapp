import { Component } from '@angular/core';
import { DataService } from './data.service';
import * as moment from 'moment';

type Header = {
  '2. Symbol': string;
  '1. Information': string;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-app';

  constructor(public dataService: DataService) {}


}
