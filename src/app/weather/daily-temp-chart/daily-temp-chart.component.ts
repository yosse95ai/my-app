import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartOptions,ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.scss']
})
export class DailyTempChartComponent {

  @Input() dataSet: number[]=[];

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['dataSet'].currentValue) {
      let val = changes['dataSet'].currentValue;
      this.lineChartData[0].data = val;
    }
  }
  // data
  lineChartData: ChartDataSets[] = [
    {
    data: this.dataSet,
    label: 'Daily Temp'
    },
  ];

  // labels name
  lineChartLabels: Label[] = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23"
  ]

  lineChartOptions = {
    responsive: true,
  }

  // Colors
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor:'rgba(255,0,255,0.28)',
    },
  ]

  lineChartLegend = true; // グラフの属性ラベル
  lineChartPlugins = [];
  lineChartType: ChartType = 'line'; // グラフの種類
}
