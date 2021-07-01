import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private urlBase: string = environment.weatherUrlBase + "appid=" + environment.OPEN_WEATHERT_MAP;
  constructor(private http: HttpClient) {   }

  getWeather(lat: number, lon: number): Observable<any> {
    let url: string = this.urlBase + "&lat=" + lat + "&lon=" + lon;
    return this.http.get(url);
  }

}
