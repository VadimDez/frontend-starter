import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

export interface PublicResource {
  status: string
}
export interface PrivateResource {
  status: string
}
export interface MeResource {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {}

  static goToLogin() {
    window.location.replace(`${window.location.origin}/login`);
  }

  public getPublic() {
    return this.http.get<PublicResource>(`${environment.API_URL}health`);
  }

  public getProtected() {
    return this.http.get<PrivateResource>(`${environment.API_URL}protected`);
  }

  public getMe()  {
    return this.http.get<MeResource>(`/auth/me`);
  }
}
