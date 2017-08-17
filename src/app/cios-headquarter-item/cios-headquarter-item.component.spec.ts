import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosHeadquarterItemComponent } from './cios-headquarter-item.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { MdMenuModule } from '@angular/material';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { HeadquarterService } from '../services/headquarter.service';
import { MockHeadquerterService } from '../../testing/mock-headquarter.service';
import { IHeadquarter } from '../interfaces/IHeadquarter';

describe('CiosHeadquarterItemComponent', () => {
  let component: CiosHeadquarterItemComponent;
  let fixture: ComponentFixture<CiosHeadquarterItemComponent>;
  let de: DebugElement;
  let elm: HTMLElement;

  const item: IHeadquarter = {
    id: 1
    , name: 'Sede'
    , state: 1
    , created_by: 'Dummy User'
    , created_at: new Date().getTime() / 1000
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule]
      , declarations: [CiosHeadquarterItemComponent, DateFormatPipe]
      , schemas: [NO_ERRORS_SCHEMA]
      // , providers: [
      //   { provide: HeadquarterService, useClass: MockHeadquerterService }
      // ]
    })
      .overrideComponent(CiosHeadquarterItemComponent, {
        set: {
          providers: [
            { provide: HeadquarterService, useClass: MockHeadquerterService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosHeadquarterItemComponent);
        component = fixture.componentInstance;
        component.item = item;
        fixture.detectChanges();
        de = fixture.debugElement;
        elm = de.nativeElement;
      });
  }));

  // beforeEach(() => {
  //   fixture.detectChanges();
  // });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contains headquarter name', () => {
    expect(elm.textContent).toContain(item.name);
  });
});
