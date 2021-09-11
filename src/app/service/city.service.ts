import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface townInfo {
  city: string;
  city_kana: string;
  town: string;
  town_kana: string;
  x: number;
  y: number;
  prefecture: string;
  postal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getPrefs(): Observable<any>{
    let url = "http://geoapi.heartrails.com/api/json?method=getPrefectures"
    return this.http.get(url);
  }

  getCities(prefecture: string): Observable<any> {
    let url = environment.apiBaseUrl + "method=getCities&prefecture=" + prefecture;
    return this.http.get(url);
  }

  getTowns(city: string): Observable<any> {
    let url = environment.apiBaseUrl + "method=getTowns&city=" + city;
    return this.http.get(url);
  }

  getLatLon(town: townInfo){
    let longitude = town.x;
    let latitude = town.y;
    return { "lat":latitude, "lon":longitude };
  }
}
