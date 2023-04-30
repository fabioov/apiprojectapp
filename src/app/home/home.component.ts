import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subscription } from 'rxjs';

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

interface StockData {
  c: number;
  d: string | null;
  dp: number | null;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('inputField', { static: false }) inputField!: ElementRef;
  title = 'stock-app';
  header: Header;
  data: { [key: string]: any };
  dataSub: Subscription;
  companySearch: { [key: string]: any };
  daily: { [key: string]: any };
  date: string;
  symbol: string = '';
  searchQuery: string = '';
  companyTicker: any[];
  isSearchActive = false;
  message: string = '';
  companyInfoData: CompanyProfile;
  CompanyInfoDataSub: Subscription;
  showCard = false;
  showCalendar = false;
  selected: Date | null;
  progress = false;
  profile: string;
  symbolListSub: Subscription;
  errorCatch: any;
  noProfileData: boolean = false;

  constructor(
    public dataService: DataService // add SymbolSearchService dependency
  ) {}

  ngOnInit(): void {}

  onButtonClick(item: any) {
    // Here, you can use the value of the symbol variable
    this.showCard = true;
    this.showCalendar = false;
    this.progress = true;
    this.noProfileData = false;


    const inputValue = this.inputField.nativeElement.value.replace(/\s/g, '');
    const compTick = inputValue.split('-');

    if (inputValue) {
      this.symbol = compTick[0];
      // You can also pass it to a method in your DataService to fetch data for that symbol
      debugger;
      this.CompanyInfoDataSub = this.dataService
        .getCompanyProfile(this.symbol)
        .subscribe({
          next: (profile: any) => {
            this.handleProfile(profile);
            this.progress = false;
          },

          error: (error: HttpErrorResponse) => {
            this.handleProfileError();
            this.progress = false;
          },
        });

      // this.dataSub = this.dataService.getStockPrices(this.symbol).subscribe({
      //   next: (prices: any) => {
      //     this.handleStockPrices(prices);
      //     this.progress = false;
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     this.handleStockPricesError();
      //     this.progress = false;
      //   },
      // });
    }
  }

  handleProfile(profile: any) {
    this.companyInfoData = profile;
debugger;
const entries = Object.entries(this.companyInfoData);
    if (entries.length === 0) {
      this.message = `Data not found.`;
    } else {
      this.message = `Country: ${this.companyInfoData['country']}<br>
                    Currency: ${this.companyInfoData['currency']}<br>
                    Name: ${this.companyInfoData['name']}<br>
                    Ticker: ${this.companyInfoData['ticker']}
                    Web Site: ${this.companyInfoData['weburl']}`;
    }
  }

  handleProfileError() {
    debugger;
    this.companyInfoData = {} as CompanyProfile;
    this.errorCatch = this.dataService.getErrorCatch();
    if (this.errorCatch.status !== 200 || this.companyInfoData === undefined) {
      this.noProfileData = true; 
      this.message = `You do not have access to this company.`;
    }
  }

  // handleStockPrices(result: any) {
  //   this.data = result as StockData;

  //   this.message = `Open: US$ ${this.data['o']}<br>
  //                   High: US$ ${this.data['h']}<br>
  //                   Low: US$ ${this.data['l']}<br>
  //                   Close: US$ ${this.data['c']}`;
  // }

  // handleStockPricesError() {
  //   this.errorCatch = this.dataService.getErrorCatch();
  //   if (this.errorCatch.status !== 200) {
  //     this.message = `This company does not contain profile data.`;
  //   }
  // }

  onKeyUp(companyName: any) {
    this.progress = true;
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
      this.symbolListSub = this.dataService
        .getSymbolList(this.searchQuery)
        .subscribe((search: any) => {
          console.log('Received Symbol data:', search);
          this.companyTicker = search['result'];
          this.progress = false;
        });
    }
  }

  onResultBoxClick(item: any) {
    this.showCalendar = true;
    this.showCard = false;
    // this.companyInfoData = item;
    console.log(this.companyInfoData);
    const searchInput = document.querySelector(
      '.searchInput input'
    ) as HTMLInputElement;
    searchInput.value = `${item['displaySymbol']} - ${item['description']}`;
    this.isSearchActive = false;
  }

  ngOnDestroy(): void {
    this.CompanyInfoDataSub.unsubscribe();
    this.dataSub.unsubscribe();
    this.symbolListSub.unsubscribe();
  }
}
