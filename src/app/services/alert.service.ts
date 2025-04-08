import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert$ = new BehaviorSubject<string>('');
  getAlert$() {
    return this.alert$.asObservable();
  }
  show(msg: string) {
    this.alert$.next(msg);
    setTimeout(() => {
      this.hide();
    }, 5 * 1000);
  }
  hide() {
    this.alert$.next('');
  }
}
