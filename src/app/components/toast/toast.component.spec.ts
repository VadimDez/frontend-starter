import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { Component, Input } from '@angular/core';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  // tslint:disable-next-line
  @Component({selector: 'ngb-toast', template: ''})
  class NgbToastComponent {
    @Input() header;
    @Input() autohide;
    @Input() delay;
    @Input() class;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastComponent, NgbToastComponent ],
      providers: [
        { provide: ToastService, use: {} },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ToastComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
