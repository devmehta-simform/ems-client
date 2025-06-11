import { Injectable } from '@angular/core';

export const DataStoreKeys = {
  USER: 'user',
} as const;

type DataStoreKeysType = (typeof DataStoreKeys)[keyof typeof DataStoreKeys];

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  addData(key: DataStoreKeysType, val: unknown) {
    switch (key) {
      case 'user':
        localStorage.setItem(key, JSON.stringify(val));
        break;
      default:
        throw new Error('undefined key passed to dataStoreService');
    }
  }

  removeData(key: DataStoreKeysType) {
    localStorage.removeItem(key);
  }

  getData(key: DataStoreKeysType) {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
    else return undefined;
  }
}
