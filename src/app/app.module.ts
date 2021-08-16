import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts'

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
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// コンポーネント
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { WeatherComponent } from './weather/weather.component';
import { HourlyTempChartComponent } from './weather/hourly-temp-chart/hourly-temp-chart.component';
import { DailyTempChartComponent } from './weather/daily-temp-chart/daily-temp-chart.component';

// デバッグ用コンポーネント
import { DebugComponent } from './debug/debug.component';
import { DebugListTableComponent } from './debug/debug-list-table/debug-list-table.component';
import { DynamicFormComponent } from './debug/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    WeatherComponent,
    HourlyTempChartComponent,
    DailyTempChartComponent,
    DebugComponent,
    DebugListTableComponent,
    DynamicFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgxChartsModule,
    //アニメーションモジュールインポート
    BrowserAnimationsModule,
    // HTTPサービスインポート
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material モジュールインポート
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    // flex Layout
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
