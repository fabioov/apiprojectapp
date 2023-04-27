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

  getNews(symbol: string): Observable<NewsData> {
    debugger;
    return this.http.get<NewsData>(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=8AI8BXTX0FG34321`
    );
  }
  getCompany(company: string): Observable<SymbolSearch> {
    return this.http.get<SymbolSearch>(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=8AI8BXTX0FG34321`
    );
  }
  // FINNHUB API
  getCompanyProfile(profile: string): Observable<Profile> {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${profile}&limit=20&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;
    return this.http.get<Profile>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching company profile:', error);
        return throwError(
          () => new Error('Failed to get company profile info.')
        );
      })
    );
  }

  getSymbolList(symbolList: string): Observable<SymbolList> {
    const url = `https://finnhub.io/api/v1/search?q=${symbolList}&limit=20&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;
    return this.http.get<SymbolList>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching symbol list:', error);
        return throwError(() => new Error('Failed to get symbol list.'));
      })
    );
  }

  getStockPrices(stockPrices: string): Observable<StockPrices> {
    const url = `https://finnhub.io/api/v1/quote?symbol=${stockPrices}&limit=20&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;

    return this.http.get<StockPrices>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching stock prices:', error);
        return throwError(() => new Error('Failed to get stock prices.'));
      })
    );
  }

  getCompanyNews(
    companyNews: string,
    fromDate: Date,
    toDate: Date
  ): Observable<CompanyNews> {
    const url = 
    `https://finnhub.io/api/v1/company-news?symbol=${companyNews}&from=${fromDate}&to=${toDate}&token=cgvi7j9r01qqk0dokcigcgvi7j9r01qqk0dokcj0`;
    return this.http.get<CompanyNews>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching company news:', error);
        return throwError(() => new Error('Failed to get company news.'));
      })
      
    );
  }
}
