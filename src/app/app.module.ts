import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

//アニメーションモジュールインポート
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// HTTPサービスインポート
import { HttpClientModule } from '@angular/common/http';

// Angular Material モジュールインポート
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';

// コンポーネント
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { WeatherComponent } from './weather/weather.component';
import { HourlyTempChartComponent } from './weather/hourly-temp-chart/hourly-temp-chart.component';
import { DailyTempChartComponent } from './weather/daily-temp-chart/daily-temp-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    WeatherComponent,
    HourlyTempChartComponent,
    DailyTempChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    //アニメーションモジュールインポート
    BrowserAnimationsModule,
    // HTTPサービスインポート
    HttpClientModule,
    FormsModule,
    // Angular Material モジュールインポート
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
