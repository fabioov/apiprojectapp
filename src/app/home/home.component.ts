import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment';

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

  title = 'stock-app';
  header: Header;
  data: {[key: string]: any};
  companySearch: {[key: string]: any}
  daily: any;
  date: string;
  dateFormatted: string;
  symbol: string = '';
  searchQuery: string = '';
  companyTicker: any[];

  constructor(
    public dataService: DataService // add SymbolSearchService dependency
  ) {}


  ngOnInit(): void {

   }

   onButtonClick(item: any) {
    debugger
    // Here, you can use the value of the symbol variable
    this.symbol = item + '.SA';
    // You can also pass it to a method in your DataService to fetch data for that symbol
    this.dataService.getNews(this.symbol).subscribe((result: any) => {
    
      this.data = result['Time Series (Daily)'];
      const date = '2022-11-23';
      this.daily = this.data[date];
      this.date = moment(date).format('DD-MM-YYYY');
      
      debugger
      this.header = result['Meta Data'];
    });
  }

  onKeyUp(companyName: any) {
debugger
    this.searchQuery = companyName.target.value;

    this.dataService.getCompany(this.searchQuery).subscribe((search: any) => {
debugger
      this.companyTicker = search['bestMatches'];

    });
  }

  
}
