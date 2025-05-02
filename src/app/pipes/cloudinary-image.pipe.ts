import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'cloudinaryImage',
})
export class CloudinaryImagePipe implements PipeTransform {
  transform(urlSuffix: string, type: 'event' | 'user'): string {
    const baseUrl = 'https://res.cloudinary.com';
    switch (type) {
      case 'event': {
        return baseUrl + '/' + environment.CLOUDINARY_CLOUD_NAME + '/' + 'image' + '/' + 'upload' + '/' + urlSuffix;
      }
      case 'user': {
        return '';
      }
      default: {
        return '';
      }
    }
  }
}
