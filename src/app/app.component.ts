import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, LoaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  loader$;
  alert$;
  constructor(
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {
    this.loader$ = this.loaderService.getLoader$();
    this.alert$ = this.alertService.getAlert$();
  }
  title = 'client';
}
