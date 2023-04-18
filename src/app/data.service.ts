import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type NewsData = {
  articles: any[];
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsData> {
    return this.http.get<NewsData>('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=PETR4.SA&apikey=8AI8BXTX0FG34321');
  }
}
