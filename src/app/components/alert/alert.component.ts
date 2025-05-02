import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input({ required: true }) type!: 'info' | 'success' | 'warning' | 'error';
  @Input({ required: true }) message!: string;
  @Output() closeAlert = new EventEmitter<null>();

  handleClose() {
    this.closeAlert.emit();
  }
}
