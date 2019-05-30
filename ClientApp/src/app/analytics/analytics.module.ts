import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartsModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
