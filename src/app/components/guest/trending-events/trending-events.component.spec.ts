import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingEventsComponent } from './trending-events.component';

describe('TrendingEventsComponent', () => {
  let component: TrendingEventsComponent;
  let fixture: ComponentFixture<TrendingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
