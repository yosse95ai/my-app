import { Component } from '@angular/core';
import { ConfigService } from './service/config.service';

interface cityRes {
  city: string;
  city_kana: number;
}
let ApiData: cityRes[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '市町村区検索API';
  displayedColumns: string[] = ['city', 'city-kana'];
  dataSource = ApiData;
  city: string = '';

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.config.getAPI().subscribe(res => {
      let tmp = res['response'];
      this.dataSource = tmp['location'];
      this.sortCities4name();
    });
  }

  // フォームの値をもとに住所検索
  search(): void {
    if (this.city) {
      this.config.getCities(this.city).subscribe(res => {
        let tmp = res['response']
        this.dataSource = tmp['location'];
        this.sortCities4name();
      });
    }
  }

  // 五十音順にソート
  sortCities4name(): void {
    this.dataSource.sort(function (a, b) {
      if (a.city_kana > b.city_kana) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
