import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//アニメーションモジュールインポート
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// HTTPサービスインポート
import { HttpClientModule } from '@angular/common/http';

// ボタン・チェックボックスモジュールインポート
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //アニメーションモジュールインポート
    BrowserAnimationsModule,
    // HTTPサービスインポート
    HttpClientModule,
    FormsModule,
    // ボタン・チェックボックスモジュールインポート
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
