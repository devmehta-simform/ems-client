import { Injectable } from '@angular/core';

type DataStore = Record<string, unknown>;

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  data: DataStore = {};
  addData(key: string, val: unknown) {
    this.data[key] = val;
  }
  removeData(key: string) {
    if (this.data[key]) delete this.data[key];
  }
  getData(key: string) {
    return this.data[key];
  }
}
