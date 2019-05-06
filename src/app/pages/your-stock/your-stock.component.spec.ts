import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourStockComponent } from './your-stock.component';

describe('YourStockComponent', () => {
  let component: YourStockComponent;
  let fixture: ComponentFixture<YourStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
