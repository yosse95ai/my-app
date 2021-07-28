import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.scss']
})
export class DailyTempChartComponent {

  @Input() dataSet: any;
  private datas: number[] = [];
  private indexs: string[] = [];
  private minimam = 0;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['dataSet'].currentValue) {
      let val = changes['dataSet'].currentValue;
      for (let i = 0; i < val.hourly.length; i++) {
        this.indexs[i] = (new Date(val.hourly[i].dt * 1000).getHours().toString());
        this.datas[i] = (+(val.hourly[i].temp - 273.15).toFixed(2));
      }
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

  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          steps: 10,
          stepValue: 10,
          min: this.minimam
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
