import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { BackendService } from 'src/app/Services/backend.service';
import { UserService } from 'src/app/Services/user.service';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  ispResults: any;
  chart: any;

  ngOnInit(): void {
    const userInfo = this.userInfoService.getUserInfoFromSessionStorage();
    const location = userInfo?.city || 'Unknown City';
    this.backendService.getIspResult(location!).subscribe(
      (data: any) => {
        this.ispResults = data.isPs;
        this.createChart();
      }
    );
  }
  constructor(
    private backendService: BackendService,private userInfoService: UserService) { }

  createChart() {
    var isps = this.ispResults.map((d:any) => d.isp);
    var downloadSpeed = this.ispResults.map((d:any) => d.downloadSpeed);
    const uploadSpeed = this.ispResults.map((d:any) => d.uploadSpeed);

    this.chart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: isps,
        datasets: [{
          label: 'download speed',
          data: downloadSpeed,
          backgroundColor: '#c5d5cb'
        },
        {
          label: "upload speed",
          data: uploadSpeed,
          backgroundColor: '#e3e0cf'
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
