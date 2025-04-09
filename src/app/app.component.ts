import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, LoaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loader$!: Observable<boolean>;
  alert$!: Observable<string>;

  constructor(
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loader$ = this.loaderService.getLoader$();
    this.alert$ = this.alertService.getAlert$();
  }

  title = 'client';
}
