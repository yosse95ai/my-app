import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private urlBase: string = environment.weatherUrlBase + "appid=" + environment.OPEN_WEATHERT_MAP;
  private hourlyUrl: string = environment.hourlyOneCallUrl + "appid=" + environment.OPEN_WEATHERT_MAP;
  private dailyUrl: string = environment.dailyOneCallUrl + "appid=" + environment.OPEN_WEATHERT_MAP;
  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<any> {
    let url: string = this.urlBase + "&lat=" + lat + "&lon=" + lon;
    return this.http.get(url);
  }
  getHourlyWeather(lat: number, lon: number): Observable<any> {
    let url: string = this.hourlyUrl + "&lat=" + lat + "&lon=" + lon;
    return this.http.get(url);
  }
  getDailyWeather(lat: number, lon: number): Observable<any> {
    let url: string = this.dailyUrl + "&lat=" + lat + "&lon=" + lon;
    return this.http.get(url);
  }
}
