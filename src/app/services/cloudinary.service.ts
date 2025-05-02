import { Injectable } from '@angular/core';
// import { v2 as cloudinary } from 'cloudinary';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${environment.CLOUDINARY_CLOUD_NAME}/image/upload`;

  constructor(private httpClient: HttpClient) {}

  upload(files: File[]): Observable<(string | undefined)[]> {
    const result = forkJoin(
      files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ems_event_images_preset');
        formData.append('folder', 'event_images');
        return this.httpClient.post(this.cloudinaryUrl, formData).pipe(
          map(res => {
            if (
              res &&
              typeof res === 'object' &&
              'public_id' in res &&
              typeof res.public_id === 'string' &&
              'format' in res &&
              typeof res.format === 'string'
            ) {
              return res.public_id + '.' + res.format;
            }
            return undefined;
          })
        );
      })
    );
    return result;
  }
}
