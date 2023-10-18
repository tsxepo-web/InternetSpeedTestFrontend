import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeedTestComponent } from './Components/speed-test/speed-test.component';
import { ClientInfoComponent } from './Components/client-info/client-info.component';
import { LineChartComponent } from './Components/line-chart/line-chart.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeedTestComponent,
    ClientInfoComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
