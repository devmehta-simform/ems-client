import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert$ = new BehaviorSubject<{ message: string; type: 'info' | 'success' | 'warning' | 'error' }>({
    message: '',
    type: 'error',
  });
  getAlert$() {
    return this.alert$.asObservable();
  }
  show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'error') {
    this.alert$.next({ message, type });
  }
  hide() {
    this.alert$.next({ message: '', type: 'error' });
  }
}
