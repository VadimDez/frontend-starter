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

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mainService: MainService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
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

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to frontend-starter!'
    );
  });

  it('should get public data', fakeAsync(async () => {
    const data = { status: 'ok' };

    spyOn(component, 'getPublic').and.callThrough();
    const getPublicSpy = spyOn(mainService, 'getPublic').and.returnValue(
      of(data)
    );
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button.public'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.publicResponse).toEqual(data);
    expect(component.getPublic).toHaveBeenCalled();
    expect(getPublicSpy).toHaveBeenCalled();
  }));

  it('should get protected data', fakeAsync(async () => {
    const data = { status: 'ok' };

    spyOn(component, 'getProtected').and.callThrough();
    const getProtectedSpy = spyOn(mainService, 'getProtected').and.returnValue(
      of(data)
    );
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button.private'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.getProtected).toHaveBeenCalled();
    expect(getProtectedSpy).toHaveBeenCalled();
  }));
});
