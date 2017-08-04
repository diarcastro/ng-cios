import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosUserNotesComponent } from './cios-user-notes.component';

describe('CiosUserNotesComponent', () => {
  let component: CiosUserNotesComponent;
  let fixture: ComponentFixture<CiosUserNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosUserNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosUserNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
