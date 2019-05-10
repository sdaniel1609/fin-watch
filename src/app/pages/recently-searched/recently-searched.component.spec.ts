import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlySearchedComponent } from './recently-searched.component';

describe('RecentlySearchedComponent', () => {
  let component: RecentlySearchedComponent;
  let fixture: ComponentFixture<RecentlySearchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlySearchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlySearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
