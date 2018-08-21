import { Component } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private mainService: MainService) {
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
