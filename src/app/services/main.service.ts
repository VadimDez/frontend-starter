import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) {}

  static goToLogin() {
    window.location.replace(`${ window.location.origin }/login`);
  }

  public getPublic() {
    return this.http.get(`${ environment.API_URL }test`);
  }

  public getProtected() {
    return this.http.get(`${ environment.API_URL }protected`);
  }

  public getMe() {
    return this.http.get(`/auth/me`);
  }
}
