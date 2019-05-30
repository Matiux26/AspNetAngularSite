import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../analytics.service';
import { Predictions } from '../../models/predictions';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { delay } from 'q';
import * as _ from 'underscore';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  quantity: any;
  constructor(private _analyticsService: AnalyticsService) { }

  predictions: any;
  history_transaction: any;
  date_list: any;
  quantity_list: any = [];
  history_date_list: any;
  history_quantity_list: any;
  render: number = 0;

  async ngOnInit() {
    this.predictions = await this._analyticsService.getAnalyticsData().toPromise();
    this.date_list = this.predictions.map(x => x.date);
    this.quantity_list = this.predictions.map(x => parseInt(x.quantity));

    this.lineChartLabels = this.date_list;
    this.lineChartData[0]['data'] = this.quantity_list;

    this._analyticsService.getPastTransactionData().subscribe((responseList) => {
      var responseData1 = responseList[0];
      var responseData2 = responseList[1];
      var finalArray = _.map(responseData2, function (responseData2) {
        return _.extend(responseData2, _.omit(_.findWhere(responseData1, { id: responseData2.order_id }), 'id'));
      });

      this.history_transaction = finalArray;
      this.history_date_list = this.history_transaction.map(x => x.date);
      this.history_quantity_list = this.history_transaction.map(x => parseInt(x.quantity));
      this.quantity = [];
      for(var i=0;i<this.history_date_list.length;i++){
        this.quantity[i] = 0;
      }
      var j=0;
      for(var i=0;i<this.history_date_list.length;i++){
        if(this.history_date_list[i]==this.history_date_list[i+1]){
          this.quantity[j] += this.history_quantity_list[i];
        }else{
          j++;
        }
      }
      this.history_quantity_list = this.quantity;
      this.history_date_list = this.history_date_list.filter((el, i, a) => i === a.indexOf(el));
      console.log(this.history_date_list);
      this.render = 1;
      this.lineChartLabels1 = this.history_date_list;
      this.lineChartData1[0]['data'] = this.history_quantity_list;
    });
  }

  public lineChartData: ChartDataSets[] = [
    { data: [1, 2, 3, 4, 5], label: 'Quantity' }
  ];
  public lineChartLabels: Label[];

  public lineChartData1: ChartDataSets[] = [
    { data: [1, 2, 3, 4, 5], label: 'Quantity' }
  ];
  public lineChartLabels1: Label[];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
