import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type NewsData = {
  articles: any[];
};

type SymbolSearch = {
  bestMatches: any[];
};

type Profile = {
  profile: any[];
};

type SymbolList = {
  symbolList: any[];
};

type StockPrices = {
  stockPrices: any[];
};

type CompanyNews = {
  companyNews: any[];
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  errorCatch: any;

  // getNews(symbol: string): Observable<NewsData> {
  //   debugger;
  //   return this.http.get<NewsData>(
  //     `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=8AI8BXTX0FG34321`
  //   );
  // }
  // getCompany(company: string): Observable<SymbolSearch> {
  //   return this.http.get<SymbolSearch>(
  //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=8AI8BXTX0FG34321`
  //   );
  // }
  // FINNHUB API
  getCompanyProfile(profile: string): Observable<Profile> {
    debugger;
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${profile}&limit=20&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;
    return this.http.get<Profile>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching company profile:', error);
        this.errorCatch = error;
        debugger;
        return throwError(() => new Error(this.errorCatch));
      })
    );
  }

  getSymbolList(symbolList: string): Observable<SymbolList> {
    const url = `https://finnhub.io/api/v1/search?q=${symbolList}&limit=20&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;
    return this.http.get<SymbolList>(url).pipe(
      catchError((error: any) => {
        this.errorCatch = error;
        console.error('Error fetching symbol list:', error);
        return throwError(() => new Error(this.errorCatch));
      })
    );
  }

  getStockPrices(stockPrices: string): Observable<StockPrices> {
    const url = `https://finnhub.io/api/v1/quote?symbol=${stockPrices}&limit=20&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;

    return this.http.get<StockPrices>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching stock prices:', error);
        this.errorCatch = error;
        debugger;
        return throwError(() => new Error(this.errorCatch));
      })
    );
  }

  getCompanyNews(
    companyNews: string,
    fromDate: string,
    toDate: string
  ): Observable<CompanyNews> {
    debugger;
    const url = `https://finnhub.io/api/v1/company-news?symbol=${companyNews}&from=${fromDate}&to=${toDate}&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;
    return this.http.get<CompanyNews>(url).pipe(

      catchError((error: any) => {
        this.errorCatch = error;
        return throwError(() => new Error(this.errorCatch));
      })
    );
  }

  public getErrorCatch() {
    return this.errorCatch;
  }
}
