import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader$ = new Subject<boolean>();
  getLoader$() {
    return this.loader$;
  }
  show() {
    this.loader$.next(true);
  }
  hide() {
    this.loader$.next(false);
  }
}
