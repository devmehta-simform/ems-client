import { Injectable } from '@angular/core';
// import { v2 as cloudinary } from 'cloudinary';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${environment.CLOUDINARY_CLOUD_NAME}/image/upload`;

  constructor(private httpClient: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ems_event_images_preset');
    formData.append('folder', 'event_images');
    this.httpClient.post(this.cloudinaryUrl, formData).subscribe((res: unknown) => {
      console.log('Upload successful:', res);
      if (res && typeof res === 'object' && 'secure_url' in res) alert('Image URL: ' + res.secure_url);
    });
  }
}
