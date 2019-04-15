import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLookupComponent } from './company-lookup.component';

describe('CompanyLookupComponent', () => {
  let component: CompanyLookupComponent;
  let fixture: ComponentFixture<CompanyLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
