import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    let url = environment.apiBase + "method=getCities&prefecture=" + prefecture;
    return this.http.get(url);
  }

  getTowns(city: string): Observable<any> {
    let url = environment.apiBase + "method=getTowns&city=" + city;
    return this.http.get(url);
  }

}
