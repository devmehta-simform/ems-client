import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  addData(key: string, val: unknown) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  getData(key: string) {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
    else return undefined;
  }
}
