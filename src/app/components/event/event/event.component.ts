import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EventSchema } from '../../../../response-types';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { z } from 'zod';

@Component({
  selector: 'app-event',
  imports: [DatePipe, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  @Input({ required: true }) event!: z.infer<typeof EventSchema>;
  heartStatus: 'filled' | 'unfilled' | 'animate' = 'unfilled';
  timeoutId?: number;
  @ViewChild('animatedHeart') animatedHeartRef!: ElementRef;
  handleLike() {
    if (this.heartStatus === 'unfilled') {
      this.heartStatus = 'animate';
      this.animatedHeartRef.nativeElement.src = `icons/animate-heart.gif?t=${Date.now()}`;
      this.timeoutId = window.setTimeout(() => {
        this.heartStatus = 'filled';
      }, 1700);
    } else {
      if (this.heartStatus === 'animate') {
        if (this.animatedHeartRef.nativeElement instanceof HTMLImageElement) {
          this.animatedHeartRef.nativeElement.src = 'icons/filled-heart.svg';
        }
        window.clearTimeout(this.timeoutId);
      }
      this.heartStatus = 'unfilled';
    }
  }
}
