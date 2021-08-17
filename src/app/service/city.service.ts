import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  /**
   * APIに県名リストを要求
   * @returns 県名リスト
   */
  getPrefs(): Observable<any> {
    let url = "http://geoapi.heartrails.com/api/json?method=getPrefectures"
    return this.http.get(url);
  }

    /**
     * APIに市町村区リストを要求
     * @param prefecture 県名
     * @returns 市町村区リスト
     */
  getCities(prefecture: string): Observable<any> {
    let url = environment.apiBaseUrl + "method=getCities&prefecture=" + prefecture;
    return this.http.get(url);
  }

  /**
   * APIに地域名リストを要求
   * @param city 市町村区名
   * @returns 地域名リスト
   */
  getTowns(city: string): Observable<any> {
    let url = environment.apiBaseUrl + "method=getTowns&city=" + city;
    return this.http.get(url);
  }

  /**
   * GeoLocation API から現在地を取得
   * @returns 現在地の情報
   */
  getCurrentPosition(): Observable<any> {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        success => {
          obs.next(success.coords);
          obs.complete();
        },
        error => {
          obs.error(error);
        }
      )
    });
  }
}
