import { Component } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoadingPublic = false;
  isLoadingPrivate = false;
  publicResponse: any;

  constructor(private mainService: MainService) {
    this.mainService.getMe().subscribe((res: { accessToken: string }) => {
      localStorage.setItem('token', res.accessToken);
    });
  }

  getPublic() {
    this.isLoadingPublic = true;
    this.mainService.getPublic().subscribe((res: { status: string }) => {
      this.publicResponse = res;
      this.isLoadingPublic = false;
    }, () => {
      this.isLoadingPublic = false;
    });
  }

  getProtected() {
    this.isLoadingPrivate = true;
    this.mainService.getProtected().subscribe((res: { status: string }) => {
      console.log('protected', res);
      this.isLoadingPrivate = false;
    }, (err: any) => {
      this.isLoadingPrivate = false;
      if (err.status === 401) {
        MainService.goToLogin();
      }
    });
  }
}
