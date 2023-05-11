import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from '../app.component';
import * as auth from 'firebase/auth';

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
export class HomeComponent implements OnInit {

  user$ = this.authService.currentUser$;
  @ViewChild('inputField', { static: false }) inputField!: ElementRef;
  title = 'stock-app';
  header: Header;
  data: { [key: string]: any };
  dataSub: Subscription;
  companySearch: { [key: string]: any };
  news: [];
  date: string;
  symbol: string = '';
  searchQuery: string = '';
  companyTicker: any[];
  isSearchActive = false;
  profileMessage: string = '';
  stockPriceMessage: string = '';
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
  noStockPriceData: boolean = false;
  newsDataSub: Subscription;

  constructor(
    public dataService: DataService,
    public authService: AuthService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {}

  onButtonClick(item: any) {
    // Here, you can use the value of the symbol variable
    this.showCard = true;
    this.showCalendar = false;
    this.progress = true;
    this.noProfileData = false;
    this.noStockPriceData = false;
    this.isSearchActive = false;

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

      this.dataSub = this.dataService.getStockPrices(this.symbol).subscribe({
        next: (prices: any) => {
          this.handleStockPrices(prices);
          this.progress = false;
        },
        error: (error: HttpErrorResponse) => {
          this.handleStockPricesError();
          this.progress = false;
        },
      });
      debugger;
      const today = new Date();
      const oldDate = new Date();
      today.setUTCHours(0, 0, 0, 0);
      oldDate.setDate(today.getDate() - 30);
      oldDate.setUTCHours(0, 0, 0, 0);
      const todayString = today.toISOString().substring(0, 10);
      const oldDateString = oldDate.toISOString().substring(0, 10);
      this.newsDataSub = this.dataService
        .getCompanyNews(this.symbol, oldDateString, todayString)
        .subscribe({
          next: (news: any) => {
            this.handleNews(news);
            this.progress = false;
          },
          error: (error: HttpErrorResponse) => {
            this.handleNewsError();
            this.progress = false;
          },
        });
    }
  }

  handleProfile(profile: any) {
    this.companyInfoData = profile;
    const entries = Object.entries(this.companyInfoData);
    if (entries.length === 0) {
      this.profileMessage = `Data not found.`;
    } else {
      this.profileMessage = `Country: ${this.companyInfoData['country']}<br>
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
    if (this.errorCatch.status !== 200) {
      this.noProfileData = true;
      this.profileMessage = `You do not have access to this company's data.`;
    }
  }

  handleStockPrices(result: any) {
    this.data = result as StockData;
    const stockEntries = Object.entries(this.data);
    if (stockEntries.length === 0) {
      this.stockPriceMessage = `Data not found.`;
    } else {
      this.stockPriceMessage = `Open: US$ ${this.data['o']}<br>
                    High: US$ ${this.data['h']}<br>
                    Low: US$ ${this.data['l']}<br>
                    Close: US$ ${this.data['c']}`;
    }
  }

  handleStockPricesError() {
    this.data = {};
    this.errorCatch = this.dataService.getErrorCatch();
    if (this.errorCatch.status !== 200) {
      this.noStockPriceData = true;
      this.stockPriceMessage = `Company's stock data not available.`;
    }
  }

  handleNews(news: any) {
    debugger;
    this.news = news;
  }

  handleNewsError() {}

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

  // ngOnDestroy(): void {
  //   this.CompanyInfoDataSub.unsubscribe();
  //   this.dataSub.unsubscribe();
  //   this.symbolListSub.unsubscribe();
  // }

  onImageError(event: any) {
    event.target.src = '/assets/img/Financial Pic.jpeg';
  }

  openDialogForLogin() {

  }
}
