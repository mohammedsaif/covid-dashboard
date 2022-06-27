import { AfterViewInit, Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { take } from 'rxjs/operators';
import { SharedService } from 'src/app/core/services/shared.serivce';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent implements AfterViewInit {
  historyData: any;
  constructor(private readonly sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.selectedHistory.pipe(take(5)).subscribe((data) => {
      this.historyData = data;
      this.createChartColumn();
      this.createChartLine();
    })
  }
  public ngAfterViewInit(): void {
    this.createChartColumn();
    this.createChartLine();
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private createChartColumn(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i <= 100; i++) {
      date.setDate(new Date(this.historyData[i]?.day).getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.historyData[i]?.cases.active,
      });
    }

    const chart = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
        height: (9 / 16 * 100) + '%'

      },
      title: {
        text: `Active Cases`,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'Population',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Active',
        data,
      }],
    } as any);

  }
  private createChartLine(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 100; i++) {
      date.setDate(new Date(this.historyData[i]?.day).getDate() + i);
      data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
    }

    const chart = Highcharts.chart('chart-line', {
      chart: {
        type: 'line',
        height: (9 / 16 * 100) + '%'
      },
      title: {
        text: 'Active Cases Line Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: [{
        name: 'Active cases',
        data,
      }],
    } as any);


  }
}
