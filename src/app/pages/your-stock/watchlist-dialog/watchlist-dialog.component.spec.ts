import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistDialogComponent } from './watchlist-dialog.component';

describe('WatchlistDialogComponent', () => {
  let component: WatchlistDialogComponent;
  let fixture: ComponentFixture<WatchlistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
