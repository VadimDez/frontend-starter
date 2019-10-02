import {
  TestBed,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        ToastComponent,
        SpinnerComponent
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'frontend-starter'`, () => {
    expect(component.title).toEqual('frontend-starter');
  });

});
