import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }
  
  getAPI(): Observable<any>{
    return this.http.get(environment.apiUrl + '&prefecture=東京都');
  }

  getCities(city: string): Observable<any> {
    // let url = environment.apiBase + 'method="getCities"' + '&prefecture=' + city;
    let url = environment.apiBase + "method=getCities&prefecture=" + city;
    return this.http.get(url);
  }
}
