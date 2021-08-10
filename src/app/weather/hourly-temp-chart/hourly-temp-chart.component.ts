import { Component, Input, SimpleChanges } from '@angular/core';

interface data {
  name: string,
  value: number
}

@Component({
  selector: 'app-hourly-temp-chart',
  templateUrl: './hourly-temp-chart.component.html',
  styleUrls: ['./hourly-temp-chart.component.scss']
})
export class HourlyTempChartComponent {

  @Input() dataSet: any;
  private datas: data[] = [];
  private feelsLike: data[] = [];
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
      for (let i = 0; i < 24; i++) {
        let name: string = new Date(val.hourly[i].dt * 1000).getHours().toString();
        this.datas[i] = { name: name, value: +(val.hourly[i].temp - 273.15).toFixed(2) };
        this.feelsLike[i] = { name: name, value: +(val.hourly[i].feels_like - 273.15).toFixed(2) };
        this.minMax[i] = +(val.hourly[i].temp - 273.15).toFixed(2);
        this.minMax[i + 24] = +(val.hourly[i].feels_like - 273.15).toFixed(2);
      }
      // 上限下限の変更
      this.minimam = +Math.min.apply(null, this.minMax).toFixed(0) - 2.0;
      this.maximam = +Math.max.apply(null, this.minMax).toFixed(0) + 2.0;


      // チャートのデータの更新
      this.lineChartData = [
        {
          name: "Temperature",
          series: this.datas
        },
        {
          name: 'Feels like',
          series: this.feelsLike
        }
      ];

      // オプションの更新
      this.yScaleMax = this.maximam;
      this.yScaleMin = this.minimam;
    }
  }

  // View Size
  public view: any = [this.WIDTH, this.HEIGHT];

  // Data
  public lineChartData = [
    {
      name: "Temperature",
      series: this.datas
    },
    {
      name: 'Feels like',
      series: this.feelsLike
    }
  ];
  // chart options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Hour";
  yAxisLabel: string = "Temperature";
  timeline: boolean = true;
  yScaleMax: number = this.maximam;
  yScaleMin: number = this.minimam;

  // Colors
  colorScheme = {
    domain: ["#545AA4", "#A10A28", "#2CC7B4", "#AAAAAA"],
  };


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
