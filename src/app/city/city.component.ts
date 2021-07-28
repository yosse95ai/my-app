import { Component, OnInit } from '@angular/core';

import { CityService } from '../service/city.service';
import { WeatherService } from '../service/weather.service';

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

interface weatherInfo {
  coord: { lon: number; lat: number; };
  weather: weather[];
  base: string;
  main: {
    temp: number; feels_like: number; temp_min: number;
    temp_max: number; pressure: number; humidity: number;
    sea_level: number; grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number; };
  clouds: { all: number; };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number; };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
interface weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
// グローバル変数的なヤツのお試し
let CityApiData: cityRes[];
let TownApiData: townInfo[];
let TownInfoInit: townInfo;
let initWather: weatherInfo;


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  title = 'Weather Report';
  displayedColumns: string[] = ['town', 'town-kana', 'town-latitude', 'town-longitude', 'postal']; // 町名表示用
  dataSource = CityApiData;       // Apiで取得した情報
  dataSourceTown = TownApiData;   // Apiで取得した町の情報
  city_name: string = '';         // 市町村区名
  selectedTown: townInfo = TownInfoInit;
  pref_list: string[] = [];
  city_list: string[] = [];
  town_list: townInfo[] = [];
  selectedTownWeather: weatherInfo = initWather;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService
  ) { }

  // コンポーネント読み込み時処理
  ngOnInit(): void {
    // 県名リストを取得 
    this.cityService.getPrefs().subscribe(res => {
      let pref = res['response']['prefecture'];
      this.pref_list = [];
      for (let i = 0; i < pref.length; ++i) {
        this.pref_list.push(pref[i]);
      }
    });
  }

  /******************************************************/
  /** HTMLテンプレート関数 *******************************/
  /******************************************************/

  /**
   * 県名フォームの値をもとに市町村区検索
   * @param prefecture 県名
   */
  searchCities(prefecture: string): void {
    if (prefecture) {
      this.cityService.getCities(prefecture).subscribe(res => {
        let tmp = res['response']
        this.dataSource = tmp['location'];
        this.sortCities4name();
        this.city_list = [];
        for (let i = 0; i < this.dataSource.length; ++i) {
          this.city_list.push(this.dataSource[i].city);
        }
      });
    }
  }

  /**
   * - changイベント
   * - 地区名フォームの値が切り替えられたときに発火
   * - 選択されている地区を更新
   * @param town 地区の情報
   */
  changeSelectedTown(town: townInfo): void {
    this.selectedTown = town;
  }

  /**
   * フォームの値をもとに町情報を取得
   * ※この関数の代わりに天気検索する
   */
  searchTowns(): void {
    if (this.city_name) {
      this.cityService.getTowns(this.city_name).subscribe(res => {
        let tmp = res['response']
        this.dataSourceTown = tmp['location'];
        this.sortTowns4name();
        this.town_list = [];
        for (let i = 0; i < this.dataSourceTown.length; ++i) {
          // (そのた)は除外する。
          if (this.dataSourceTown[i].town_kana != '(そのた)') {
            this.town_list.push(this.dataSourceTown[i]);
          }
        }
      });
    }
  }

  /**
   * - フォームの値をもとに町情報を取得
   * - 地区名フォームの値が切り替えられたときに発火
   * @param city_name 市町村区の名前
   */
  _searchTowns(city_name: string): void {
    if (city_name) {
      this.cityService.getTowns(city_name).subscribe(res => {
        let tmp = res['response']
        this.dataSourceTown = tmp['location'];
        this.sortTowns4name();
        this.town_list = [];
        let latitude: number = 0;
        let longitude: number = 0;
        for (let i = 0; i < this.dataSourceTown.length; ++i) {
          // (そのた)は除外する。
          if (this.dataSourceTown[i].town_kana != '(そのた)') {
            this.town_list.push(this.dataSourceTown[i]);
          }
          latitude += +this.dataSourceTown[i].y;
          longitude += +this.dataSourceTown[i].x;
        }
        // 指定なし用の緯度経度(全体平均)
        latitude /= this.dataSourceTown.length;
        longitude /= this.dataSourceTown.length;
        let otherTown: townInfo = {
          city: city_name, city_kana: this.dataSourceTown[0].town_kana,
          town: '-指定なし-', town_kana: '()', x: longitude, y: latitude,
          postal: 0, prefecture: this.dataSourceTown[0].prefecture
        };
        this.town_list.unshift(otherTown);
      });
    }
  }

  /**
   * フォームに基づいて天気を検索
   */
  updateWeather(): void{
    this.weatherService.getWeather(this.selectedTown.y, this.selectedTown.x).subscribe(res => {
      this.selectedTownWeather = res;
    });
  }

  /**
   * 小数点以下切り捨て
   * @param x 数値
   * @returns 整数値
   */
  floor(x: number) {
    return Math.floor(x);
  }

  /**
   * - 郵便番号整地関数
   * - 0パディングする
   * @param x 数値
   * @param n 桁数
   * @returns 0パディングされた値
   */
  slice(x: number, n: number) {
    return ('0000' + x).slice(-n);
  }


  /******************************************************/
  /** private関数 ***************************************/
  /******************************************************/

  /**
   * 読みを基準に五十音ソート
   */
  private sortCities4name(): void {
    this.dataSource.sort(function (a, b) {
      if (a.city_kana > b.city_kana) { return 1; }
      else { return -1; }
    });
  }

  /**
   * 読みを基準に五十音ソート
   */
  private sortTowns4name(): void {
    this.dataSourceTown.sort(function (a, b) {
      if (a.town_kana > b.town_kana) { return 1; }
      else { return -1; }
    });
  }
}
