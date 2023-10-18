import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { BackendService } from 'src/app/Services/backend.service';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  historicalData: any[] = [];
  chart: any;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    this.backendService.getHistoricalData(userId).subscribe(
      data => {
        this.historicalData = data;
        this.createChart();
      }
    );
  }

  createChart() {
    this.chart = new Chart('line-chart', {
      type: 'line',
      data: {
        labels: this.historicalData.map(d => d.date),
        datasets: [{
          label: 'download speed',
          data: this.historicalData.map(d => d.downloadSpeed),
          backgroundColor: '#c5d5cb'
        },
        {
          label: "upload speed",
          data: this.historicalData.map(d => d.uploadSpeed),
          backgroundColor: '#9fa88a3'
        }]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            title: {
              display:true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display:true,
              text: 'Value',
            },
          },
        },
      },
    });
  }

}
