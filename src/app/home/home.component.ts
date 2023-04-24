import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';

type Header = {
  '2. Symbol': string;
  '1. Information': string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('inputField', { static: false }) inputField!: ElementRef;
  title = 'stock-app';
  header: Header;
  data: { [key: string]: any };
  companySearch: { [key: string]: any };
  daily: any;
  date: string;
  dateFormatted: string;
  symbol: string = '';
  searchQuery: string = '';
  companyTicker: any[];
  isSearchActive = false;

  constructor(
    public dataService: DataService // add SymbolSearchService dependency
  ) {}

  ngOnInit(): void {}

  onButtonClick(item: any) {
    // Here, you can use the value of the symbol variable
    const inputValue = this.inputField.nativeElement.value.replace(/\s/g, '');
    const compTick = inputValue.split("-");

    if (inputValue) {
      this.symbol = compTick[0];
      // You can also pass it to a method in your DataService to fetch data for that symbol
      this.dataService.getNews(this.symbol).subscribe((result: any) => {
        debugger
        this.handleResult(result);
      });
    }
  }

  handleResult(result: any) {
    this.data = result['Time Series (Daily)'];
        const date = '2023-03-17';
        this.daily = this.data[date];
        this.date = moment(date).format('DD-MM-YYYY');
        this.header = result['Meta Data'];
        console.log('This is the data: ', this.data);
        console.log('This is the header: ', this.header);
        if (this.daily === undefined ) {
          console.log(`This set of data does not contain the date ${this.date}!`);
        }else {
        console.log(`This is the daily:, ${this.daily}`);
        }
        debugger
  }

  onKeyUp(companyName: any) {
    debugger;
    if (!companyName.target.value) {
      console.log('Clearing companyTicker array');
      this.companyTicker = [];
    } else {
      console.log('Fetching company data for:', companyName.target.value);
      this.searchQuery = companyName.target.value;

      this.dataService.getCompany(this.searchQuery).subscribe((search: any) => {
        console.log('Received data:', search);
        this.companyTicker = search['bestMatches'];
      });
    }
  }

  onResultBoxClick(item: any) {
    console.log(item);
    const searchInput = document.querySelector(
      '.searchInput input'
    ) as HTMLInputElement;
    searchInput.value = `${item['1. symbol']} - ${item['2. name']}`;
    this.isSearchActive = false;
  }
}
