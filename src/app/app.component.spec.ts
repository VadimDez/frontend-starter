import { MainService } from './services/main.service';
import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({selector: 'app-header', template: ''})
class HeaderComponent {}
@Component({selector: 'app-toast', template: ''})
class ToastComponent {}
@Component({selector: 'app-spinner', template: ''})
class SpinnerComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mainService: MainService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        ToastComponent,
        SpinnerComponent
      ],
      providers: [MainService]
    })
      .compileComponents()
      .then(() => {
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        mainService = fixture.debugElement.injector.get(MainService);
      });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'frontend-starter'`, () => {
    expect(component.title).toEqual('frontend-starter');
  });

});
