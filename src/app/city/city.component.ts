import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { CityService } from '../service/city.service';

// 独自構造体
interface cityRes {
  city: string;
  city_kana: number;
}
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
// グローバル変数的なヤツのお試し
let CityApiData: cityRes[];
let TownApiData: townInfo[];

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  title = '市町村区検索API';
  displayedColumns: string[] = ['city', 'city-kana']; // 町名表示用
  dataSource = CityApiData;       // Apiで取得した情報
  dataSourceTown = TownApiData;    // Apiで取得した町の情報
  city_name: string = '';         // 市町村区名
  pref_list: string[] = [];
  city_list: string[] = [];
  town_list: townInfo[] = [];

  constructor(
    private config: ConfigService,
    private cityService: CityService
  ) { }

  // コンポーネント読み込み時処理
  ngOnInit(): void {
    this.config.getAPI().subscribe(res => {
      let tmp = res['response'];
      this.dataSource = tmp['location'];
      this.sortCities4name();
    });
    this.cityService.getPrefs().subscribe(res => {
      let pref = res['response']['prefecture'];
      this.pref_list = [];
      for (let i = 0; i < pref.length; ++i) {
        this.pref_list.push(pref[i]);
      }
    });
  }

  // フォームの値をもとに町検索
  searchCities(prefecture:string): void {
    if (prefecture) {
      this.cityService.getCities(prefecture).subscribe(res => {
        let tmp = res['response']
        this.dataSource = tmp['location'];
        this.sortCities4name();
        this.city_list = [];
        for (let i = 0; i < this.dataSource.length; ++i) {
          this.city_list.push(this.dataSource[i]['city']);
        }
      });
    }
  }

  changeCity(cn: string): void {
    this.city_name = cn;
  }

  // フォームの値をもとに緯度経度を取得
  searchTowns(): void {
    if (this.city_name) {
      this.cityService.getTowns(this.city_name).subscribe(res => {
        let tmp = res['response']
        this.dataSourceTown = tmp['location'];
        this.sortTowns4name();
        this.town_list = [];
        for (let i = 1; i < this.dataSourceTown.length; ++i) {
          if (this.dataSourceTown[i].town_kana != '(そのた)') {
            this.town_list.push(this.dataSourceTown[i]);
          }
        }
      });
    }
  }

  // 読みを基準に五十音ソート
  sortCities4name(): void {
    this.dataSource.sort(function (a, b) {
      if (a.city_kana > b.city_kana) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  // 読みを基準に五十音ソート
  sortTowns4name(): void {
    this.dataSourceTown.sort(function (a, b) {
      if (a.town_kana > b.town_kana) {
        return 1;
      } else {
        return -1;
      }
    });
  }


}
