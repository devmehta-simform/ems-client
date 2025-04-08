import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  loader$;
  constructor(private loaderService: LoaderService) {
    this.loader$ = this.loaderService.getLoader$();
  }
  title = 'client';
}
