import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {AppService} from '../services/app.service';
import {BaseChartDirective} from 'ng2-charts';
import * as chartjs from 'chartjs-plugin-labels';
import {DonutModel} from '../models/donut.model';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public options: Chart.ChartOptions = [chartjs] as Chart.ChartOptions;
  public doughnutChartColors = [
    {
      backgroundColor: [
        '#ff8800',
        '#ff0007',
        '#ffd700',
        '#ff5a08'
      ]
    }
  ];
  public doughnutChartType: Chart.ChartType = 'doughnut';


  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.data.forEach(el => {
      this.doughnutChartLabels.push(el.name);
      this.doughnutChartData.push(el.count);
    });
  }

  get data(): DonutModel[] {
    return this.appService.dataOutput;
  }

  onChanged(name: string) {
    const i = this.doughnutChartLabels.indexOf(name);
    this.doughnutChartData[i] === 0 ? this.doughnutChartData[i] = this.data[i].count : this.doughnutChartData[i] = 0;
    this.chart.update();
  }
}
