import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type NewsData = {
  articles: any[];
};

type SymbolSearch = {
  bestMatches: any[];
};

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }

  getNews(symbol: string): Observable<NewsData> {
    debugger
    return this.http.get<NewsData>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=8AI8BXTX0FG34321`);
    
  }
  getCompany(company: string): Observable<SymbolSearch> {

    return this.http.get<SymbolSearch>(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=8AI8BXTX0FG34321`);
  }
}

