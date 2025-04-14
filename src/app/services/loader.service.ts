import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader$ = new BehaviorSubject<boolean>(false);
  getLoader$() {
    return this.loader$.asObservable();
  }
  show() {
    console.log('show');
    setTimeout(() => this.loader$.next(true));
  }
  hide() {
    console.log('hide');
    setTimeout(() => this.loader$.next(false));
  }
}
