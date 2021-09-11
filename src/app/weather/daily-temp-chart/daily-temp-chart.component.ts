import { Component, Input, SimpleChanges } from '@angular/core';

interface data {
  name: string,
  value: number
}

@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.scss']
})
export class DailyTempChartComponent {

  @Input() dataSet: any;
  private datas: data[] = [];
  private feelsLike: data[] = [];
  private maxDatas: data[] = [];
  private minDatas: data[] = [];
  private minMax: number[] = [];
  private minimam = 0;
  private maximam = 50;
  private w = 1600;
  private h = 900;
  private HEIGHT = 350;
  private WIDTH = 480


  constructor() {
    this.w = screen.availWidth;
    this.h = screen.availHeight;
    if (window.innerWidth > 720) {
      this.view = [
        this.WIDTH * window.innerWidth / this.w,
        this.HEIGHT * window.innerHeight / this.h
      ];
    } else {
      this.view = [
        2 * this.WIDTH * window.innerWidth / this.w - 100,
        this.HEIGHT * window.innerHeight / this.h
      ];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['dataSet'].currentValue) {
      let val = changes['dataSet'].currentValue;
      // APIコールのデータを入れ込む
      for (let i = 0; i < val.daily.length; i++) {
        let utc = new Date(val.daily[i].dt * 1000);
        let name = utc.getDate().toString() + '(' + this.num2Day(utc.getDay()) + ')';
        this.datas[i] = { name: name, value: +(val.daily[i].temp.day - 273.15).toFixed(2) };
        this.feelsLike[i] = { name: name, value: +(val.daily[i].feels_like.day - 273.15).toFixed(2) };
        this.maxDatas[i] = { name: name, value: +(val.daily[i].temp.max - 273.15).toFixed(2) };
        this.minDatas[i] = { name: name, value: +(val.daily[i].temp.min - 273.15).toFixed(2) };
        this.minMax[i] = +(val.daily[i].temp.min - 273.15).toFixed(2);
        this.minMax[i + val.daily.length] = +(val.daily[i].feels_like.day - 273.15).toFixed(2);
      }

      // 上限下限の変更
      this.minimam = +Math.min.apply(null, this.minMax).toFixed(0) - 2.0;
      this.maximam = +Math.max.apply(null, this.minMax).toFixed(0) + 2.0;


      // チャートのデータの更新
      this.lineChartData = [
        {
          name: 'Maximum',
          series: this.maxDatas
        },
        {
          name: 'Feels like',
          series: this.feelsLike
        },
        {
          name: 'Daytime',
          series: this.datas
        },
        {
          name: 'Minimum',
          series: this.minDatas
        }
      ];

      // オプションの更新
      this.yScaleMax = this.maximam;
      this.yScaleMin = this.minimam;
    }
  }

  // View Size
  view: any = [this.WIDTH, this.HEIGHT];

  // Data
  public lineChartData = [
    {
      name: "Daily temperature",
      series: this.datas
    },
  ];
  // chart options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Day";
  yAxisLabel: string = "Temperature";
  timeline: boolean = true;
  yScaleMax: number = this.maximam;
  yScaleMin: number = this.minimam;

  // Colors
  colorScheme = {
    domain: ["#A10A28", "#5AA454", "#C7B42C", "#AAAAFF"],
  };


  private num2Day(num: number): string {
    let DAY: string[] = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'San'];
    return DAY[num];
  }

  onResize(event: any) {
    if (window.innerWidth > 720) {
      this.view = [
        this.WIDTH * event.target.innerWidth / this.w,
        this.HEIGHT * event.target.innerHeight / this.h
      ];
    } else {
      this.view = [
        2 * this.WIDTH * event.target.innerWidth / this.w - 100,
        this.HEIGHT * event.target.innerHeight / this.h
      ];
    }
  }
}
