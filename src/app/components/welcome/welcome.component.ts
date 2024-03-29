import { Component, Input } from '@angular/core';
import { MainService, MeResource, PrivateResource, PublicResource } from 'src/app/services/main.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  @Input() title = 'No Title';
  isLoadingPublic = false;
  isLoadingPrivate = false;
  publicResponse: any;


  constructor(
    private mainService: MainService,
    private toastService: ToastService,
  ) {
    this.mainService.getMe().subscribe((res: MeResource) => {
      localStorage.setItem('token', res.accessToken);
    });
  }

  getPublic() {
    this.toastService.show('Info', 'Loading public endpoint...');
    this.mainService.getPublic().subscribe(
      (res: PublicResource) => {
        this.publicResponse = res;
      }
    );
  }

  getProtected() {
    this.toastService.show('Info', 'Loading private endpoint...');
    this.mainService.getProtected().subscribe(
      (res: PrivateResource) => {
        console.log('protected', res);
      },
      (err: any) => {
        this.isLoadingPrivate = false;
        if (err.status === 401) {
          MainService.goToLogin();
        }
      }
    );
  }

}

