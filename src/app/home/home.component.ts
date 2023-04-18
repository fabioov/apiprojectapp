import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

type Header = {
  '2. Symbol': string;
  '1. Information': string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  header: Header;
  data: any[];

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    debugger
    this.dataService.getNews().subscribe((result: any) => {
      console.log(result);
      this.data = result['Time Series (Daily)'];
      this.header = result['Meta Data'];
      debugger
    });
  }
}
