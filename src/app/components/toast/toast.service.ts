import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  show(header: string, body: string, type: string = 'standard') {
    let classes = 'bg-info';
    switch (type) {
      case 'success': classes = 'bg-success'; break;
      case 'danger': classes = 'bg-danger'; break;
    }
    classes += ' text-light';
    this.toasts.push({ header, body, classname: classes });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
