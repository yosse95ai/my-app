import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { DebugComponent } from './debug/debug.component';

const routes: Routes = [
  { path: 'weather', component: CityComponent },
  { path: 'debug', component: DebugComponent }, // デバッグ用
  { path: '**', redirectTo: '/weather', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
