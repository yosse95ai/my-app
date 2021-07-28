import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-hourly-temp-chart',
  templateUrl: './hourly-temp-chart.component.html',
  styleUrls: ['./hourly-temp-chart.component.scss']
})
export class HourlyTempChartComponent {

  @Input() dataSet: any;
  private datas: number[] = [];
  private indexs: string[] = [];
  private minimam = 0;
  private maximam = 50;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['dataSet'].currentValue) {
      let val = changes['dataSet'].currentValue;

      // APIコールのデータを入れ込む
      for (let i = 0; i < 24; i++) {
        this.indexs[i] = (new Date(val.hourly[i].dt * 1000).getHours().toString());
        this.datas[i] = +(val.hourly[i].temp - 273.15).toFixed(2);
      }

      // 上限下限の変更
      this.minimam = +Math.min.apply(null, this.datas).toFixed(0) - 2.0;
      this.maximam = +Math.max.apply(null, this.datas).toFixed(0) + 2.0;

      // チャートのデータの更新
      this.lineChartData = [
        {
          data: this.datas,
          label: 'Daily Temp'
        },
      ];

      // オプションの更新
      this.lineChartOptions = {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              steps: 10,
              stepValue: 10,
              min: this.minimam,
              max: this.maximam
            }
          }]
        }
      }

      // インデックスの更新
      this.lineChartLabels = this.indexs;
    }
  }
  // data
  public lineChartData: ChartDataSets[] = [
    {
      data: this.datas,
      label: 'Daily Temp'
    },
  ];

  // labels name
  public lineChartLabels: Label[] = this.indexs;

  // chart options
  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          steps: 10,
          stepValue: 10,
          min: this.minimam,
          max: this.maximam
        }
      }]
    }
  }

  // Colors
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,255,0.28)',
    },
  ]

  public lineChartLegend = true; // グラフの属性ラベル
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line'; // グラフの種類
}
