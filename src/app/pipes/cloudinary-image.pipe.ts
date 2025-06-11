import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'cloudinaryImage',
})
export class CloudinaryImagePipe implements PipeTransform {
  transform(urlSuffix: string): string {
    const baseUrl = 'https://res.cloudinary.com';
    return baseUrl + '/' + environment.CLOUDINARY_CLOUD_NAME + '/' + 'image' + '/' + 'upload' + '/' + urlSuffix;
  }
}
