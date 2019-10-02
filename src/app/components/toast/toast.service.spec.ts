import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });

  it('should add toasts in order', () => {
    const service: ToastService = new ToastService();
    service.show('INFO', 'For your information', 'standard');
    service.show('SUCCESS', 'Ok', 'success');
    service.show('fail', 'Uh oh', 'danger');

    const toast1 = service.toasts[0];
    expect(toast1.header).toBe('INFO');
    expect(toast1.body).toBe('For your information');
    expect(toast1.classname).toBe('bg-info text-light');

    const toast2 = service.toasts[1];
    expect(toast2.header).toBe('SUCCESS');
    expect(toast2.body).toBe('Ok');
    expect(toast2.classname).toBe('bg-success text-light');

    const toast3 = service.toasts[2];
    expect(toast3.header).toBe('fail');
    expect(toast3.body).toBe('Uh oh');
    expect(toast3.classname).toBe('bg-danger text-light');
  });

  it('should remove toasts', () => {
    const service: ToastService = new ToastService();
    service.toasts = [
      'toast1',
      'toast2',
    ];
    service.remove('toast1');
    expect(service.toasts).toEqual(['toast2']);
  });
});
