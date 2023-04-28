import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';

type Header = {
  '2. Symbol': string;
  '1. Information': string;
};

interface CompanyProfile {
  name: string;
  ticker: string;
  country: string;
  currency: string;
  ipo: string;
  logo: any;
  weburl: string;
  exchange: string;
}

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
  daily: { [key: string]: any };
  date: string;
  symbol: string = '';
  searchQuery: string = '';
  companyTicker: any[];
  isSearchActive = false;
  message: string = '';
  companyInfoData: CompanyProfile;
  showCard = false;
  showCalendar = false;
  selected: Date | null;
  progress = false;

  constructor(
    public dataService: DataService // add SymbolSearchService dependency
  ) {}

  ngOnInit(): void {}

  onButtonClick(item: any) {
    // Here, you can use the value of the symbol variable
    this.showCard = true;
    this.showCalendar = false;
    this.progress = true;

    const inputValue = this.inputField.nativeElement.value.replace(/\s/g, '');
    const compTick = inputValue.split('-');

    if (inputValue) {
      this.symbol = compTick[0];
      // You can also pass it to a method in your DataService to fetch data for that symbol
      this.dataService.getCompanyProfile(this.symbol).subscribe({
        next: (profile: any) => {
          console.log('Received Company Profile data:', profile);
          this.handleProfile(profile);
          this.progress = false;
        },

        error: (error: any) => {
          console.log('Error', error);
          this.progress = false;
        },
      });

      this.dataService.getStockPrices(this.symbol).subscribe({
        next: (prices: any) => {
          console.log('Received Stock data:', prices);
          this.handleStockPrices(prices);
          this.progress = false;
        },
        error: (error: any) => {
          console.log('Error', error);
          this.progress = false;
        },
      });
      debugger;
    }
  }

  handleProfile(result: any) {
    this.companyInfoData = result;
    console.log('This is the test for Profile data', this.companyInfoData);
    debugger;
  }

  handleStockPrices(result: any) {
    this.data = result['Time Series (Daily)'];
    const date = this.selected;
    debugger;
    const dateFormatted = moment(this.selected).format('YYYY-MM-DD');
    this.daily = this.data[dateFormatted];
    this.date = moment(dateFormatted).format('DD-MM-YYYY');
    this.header = result['Meta Data'];
    console.log('This is the data: ', this.data);
    console.log('This is the header: ', this.header);
    if (this.daily === undefined) {
      this.message = `This set of data does not contain the date ${this.date}!`;
    } else {
      this.message = `Open: US$ ${this.daily['1. open']}<br>
                 High: US$ ${this.daily['2. high']}<br>
                 Low: US$ ${this.daily['3. low']}<br>
                 Close: US$ ${this.daily['4. close']}`;
    }
  }

  onKeyUp(companyName: any) {
    this.showCard = false;
    this.showCalendar = false;
    if (!companyName.target.value) {
      console.log('Clearing companyTicker array');
      this.companyTicker = [];
    } else {
      console.log('Fetching company data for:', companyName.target.value);
      this.searchQuery = companyName.target.value;

      // this.dataService.getCompany(this.searchQuery).subscribe((search: any) => {
      //   console.log('Received data:', search);
      this.dataService
        .getSymbolList(this.searchQuery)
        .subscribe((search: any) => {
          console.log('Received Symbol data:', search);
          this.companyTicker = search['result'];
        });
    }
  }

  onResultBoxClick(item: any) {
    this.showCalendar = true;
    this.companyInfoData = item;
    console.log(this.companyInfoData);
    const searchInput = document.querySelector(
      '.searchInput input'
    ) as HTMLInputElement;
    searchInput.value = `${item['displaySymbol']} - ${item['description']}`;
    this.isSearchActive = false;
  }
}
