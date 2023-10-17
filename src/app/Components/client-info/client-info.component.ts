import { Component, SimpleChanges } from '@angular/core';
import { SpeedDataService } from 'src/app/Services/speed-data.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent {
  downloadSpeed: number = 0;
  uploadSpeed: number = 0;

  constructor(
    private userInfoService: UserService,
    private speedDataService: SpeedDataService) { }

  clientInfo: any = {};
  userId: string = '';

  ngOnInit(): void {
    this.speedDataService.downloadSpeed$.subscribe(speed => {
      this.downloadSpeed = speed;
    });

    this.speedDataService.uploadSpeed$.subscribe(speed => {
      this.uploadSpeed = speed;
    });
    this.fetchClientInfo();
    this.userId = this.userInfoService.getUserId();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  fetchClientInfo() {
    this.userInfoService.getUserInfo().subscribe(
      (data) => {
        this.clientInfo = data;
        this.userInfoService.storeUserInfoInSessionStorage(data.ip_address, data.connection.organization_name, data.city);
      },
      (error) => {
        console.error('Error fetching client info', error);
      }
    );
  }
}
