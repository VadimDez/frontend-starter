import { Component } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private mainService: MainService) {
    this.mainService.getMe().subscribe((res: { accessToken: string }) => {
      localStorage.setItem('token', res.accessToken);
    });

    mainService.getPublic().subscribe((res: { status: string }) => {
      console.log('public', res);
    });
  }

  getProtected() {
    this.mainService.getProtected().subscribe((res: { status: string }) => {
      console.log('protected', res);
    }, (err: any) => {
      if (err.status === 401) {
        MainService.goToLogin();
      }
    });
  }
}
