import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from '../toast/toast.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClient } from 'selenium-webdriver/http';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';


describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let mainService: MainService;

  class MockToastService {
    show() {}
  }
  class MockMainService {
    getMe() {
      return of([0]);
    }
    getProtected() {}
    getPublic() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ WelcomeComponent ],
      providers: [
        { provide: MainService, useClass: MockMainService },
        { provide: ToastService, useClass: MockToastService },
      ]
    })
    .compileComponents()
    .then(() => {
      // httpClient = TestBed.get(HttpClient);
      // httpTestingController = TestBed.get(HttpTestingController);

      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.componentInstance;
      mainService = fixture.debugElement.injector.get(MainService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get public data', fakeAsync(async () => {
    const data = { status: 'ok' };

    spyOn(component, 'getPublic').and.callThrough();
    const getPublicSpy = spyOn(mainService, 'getPublic').and.returnValue(
      of(data)
    );
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('a.btn-light'));
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
    const btn = fixture.debugElement.query(By.css('a.btn-primary'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.getProtected).toHaveBeenCalled();
    expect(getProtectedSpy).toHaveBeenCalled();
  }));
});
