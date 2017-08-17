import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosFooterComponent } from './cios-footer.component';

describe('CiosFooterComponent', () => {
  let component: CiosFooterComponent;
  let fixture: ComponentFixture<CiosFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should have current year ' + new Date().getFullYear(), () => {
    expect(component.currentYear).toEqual(new Date().getFullYear());
  });
});
