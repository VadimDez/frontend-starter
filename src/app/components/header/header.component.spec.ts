import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar correctly', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('nav').classList).
      toContain('navbar-dark');
    expect(compiled.querySelector('a.navbar-brand').textContent).
      toMatch(/\w*Hello World\w*/);
    expect(compiled.querySelector('img').src).
      toContain('assets/garage-method.svg');
  });
});
