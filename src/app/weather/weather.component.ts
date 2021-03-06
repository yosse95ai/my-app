import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../service/weather.service';

import { weatherInfo } from 'src/app/interfaces/weatherInfo.interface';

interface weatherInfoNonNest {
  lon?: number; lat?: number; base?: string;
  temp?: number; feels_like?: number; temp_min?: number;
  temp_max?: number; pressure?: number; humidity?: number;
  sea_level?: number; grnd_level?: number;
  visibility?: number; wind_speed?: number; wind_deg?: number; gust?: number;
  clouds_all?: number; dt?: number;
  sys_type?: number; sys_id?: number; country?: string; sunrise?: number; sunset?: number;
  timezone?: number; id?: number; name?: string; cod?: number;
  weather_id?: number; weather_main?: string;
  weather_description?: string; weather_icon?: string;
}

let initWather: weatherInfo;
let nonNestData: weatherInfoNonNest[];

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  @Input() townWeather: weatherInfo = initWather;

  displayedColumns: string[] = [
    'weather', 'desc',
    'temp', 'temp_l', 'temp_h', 'hum'
  ]; // 町名表示用
  dataSource = nonNestData;
  hourlySet: any;
  dailySet: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['townWeather'].currentValue) {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add '${implements OnChanges}' to the class.
      let val = changes['townWeather'].currentValue;
      this.weatherService.getWeather(val.coord.lat, val.coord.lon).subscribe(info => {
        let ret: weatherInfoNonNest[] = [];
        let weather = info.weather;
        let r: weatherInfoNonNest = {};
        r.lon = info.coord.lon;
        r.lat = info.coord.lat;
        r.base = info.base;
        r.temp = info.main.temp;
        r.humidity = info.main.humidity;
        r.pressure = info.main.pressure;
        r.sea_level = info.main.sea_level;
        r.grnd_level = info.main.grnd_level;
        r.feels_like = info.main.feels_like;
        r.temp_max = info.main.temp_max;
        r.temp_min = info.main.temp_min;
        r.temp = info.main.temp;
        r.wind_speed = info.wind.speed;
        r.wind_deg = info.wind.deg;
        r.gust = info.wind.gust;
        r.visibility = info.visibility;
        r.clouds_all = info.clouds.all;
        r.dt = info.dt;
        r.sys_id = info.sys.id;
        r.sys_type = info.sys.type;
        r.country = info.sys.country;
        r.sunrise = info.sys.sunrise;
        r.sunset = info.sys.sunset;
        r.timezone = info.timezone;
        r.id = info.id;
        r.name = info.name;
        r.cod = info.cod;
        r.weather_description = info.weather[0].description;
        r.weather_icon = info.weather[0].icon;
        r.weather_id = info.weather[0].id;
        r.weather_main = info.weather[0].main;
        ret.push(r);
        this.dataSource = ret;
      });
      this.weatherService.getHourlyWeather(val.coord.lat, val.coord.lon).subscribe(info => {
        this.hourlySet = info;
      })
      this.weatherService.getDailyWeather(val.coord.lat, val.coord.lon).subscribe(info => {
        this.dailySet = info;
      })
    }
  }
}
