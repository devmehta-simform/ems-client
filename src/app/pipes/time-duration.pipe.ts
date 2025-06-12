import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDuration',
})
export class TimeDurationPipe implements PipeTransform {
  transform(startTimeString: string, endTimeString: string): number {
    const startTime = new Date(startTimeString);
    const endTime = new Date(endTimeString);
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    return duration;
  }
}
