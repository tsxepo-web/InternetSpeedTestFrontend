import { Component } from '@angular/core';
import { concatMap } from 'rxjs';
import { BackendService } from 'src/app/Services/backend.service';
import { DownloadService } from 'src/app/Services/download.service';
import { SpeedDataService } from 'src/app/Services/speed-data.service';
import { UploadService } from 'src/app/Services/upload.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.css']
})
export class SpeedTestComponent {
  downloadSpeed: number = 0;
  uploadSpeed: number = 0;
  downloadInProgress: boolean = false;
  uploadInProgress: boolean = false;

  constructor(
    private downloadService: DownloadService,
    private uploadService: UploadService,
    private backendService: BackendService,
    private userInfoService: UserService,
    private speedDataService: SpeedDataService) { }

  startTest() {
    const userId = this.userInfoService.getUserId();
    const userInfo = this.userInfoService.getUserInfoFromSessionStorage();

    const ip = userInfo?.ip || 'Unknown IP';
    const isp = userInfo?.isp || 'Unknown ISP';
    const city = userInfo?.city || 'Unknown City';

    this.userInfoService.storeUserInfoInSessionStorage(ip, isp, city);

    this.downloadInProgress = true;
    this.uploadInProgress = true;

    this.downloadService.startDownload()
      .pipe(
        concatMap((downloadDuration) => {
          this.downloadSpeed = this.calculateSpeed(downloadDuration.duration, downloadDuration.fileSize);
          this.speedDataService.setDownloadSpeed(this.downloadSpeed);
          this.downloadInProgress = false;
          return this.uploadService.uploadFile();
        })
      )
      .subscribe(
        uploadDuration => {
          this.uploadSpeed = this.calculateSpeed(uploadDuration.duration, uploadDuration.fileSize);
          this.speedDataService.setUploadSpeed(this.uploadSpeed);
          this.uploadInProgress = false;

          const data = {
            Id: '',
            UserId: userId,
            Ip: ip,
            ISP: isp,
            Location: city,
            UploadSpeed: this.uploadSpeed,
            DownloadSpeed: this.downloadSpeed,
            Date: new Date().toISOString()
          };
          this.backendService.saveData(data).subscribe(
            response => {
              console.log('Data saved:', response);
            },
            error => {
              console.log('Error saving data:', error);
            }
          );
        },
        error => {
          console.error(error);
          this.downloadInProgress = false;
          this.uploadInProgress = false;
        }
      );
  }

  private calculateSpeed(duration: number, dataSizeInBytes: number): number {
    const dataSizeInBits = dataSizeInBytes * 8;
    const durationInSeconds = duration / 1000;
    return (dataSizeInBits / durationInSeconds) / 1024 / 1024;
  }
}
