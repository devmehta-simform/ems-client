import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appImgFallback]',
})
export class ImgFallbackDirective {
  private elementRef = inject(ElementRef);
  constructor() {
    const element = this.elementRef.nativeElement;

    if (element instanceof HTMLImageElement) {
      element.onerror = () => {
        element.src = 'images/fallback-img.jpg';
      };
    }
  }
}
