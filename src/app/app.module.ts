import {
  NgModule
  , LOCALE_ID
  // , CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Material imports
import {
  MdButtonModule
  , MdInputModule
  , MdIconModule
  , MdCardModule
  , MdGridListModule
  , MdProgressBarModule
  , MdSelectModule
  , MdPaginatorModule
  , MdTooltipModule
  , MdToolbarModule
  , MdSidenavModule
  , MdMenuModule
  , MdDatepickerModule
  // , MdNativeDateModule
  , MdSlideToggleModule
  , DateAdapter
  , NativeDateAdapter
  , MD_DATE_FORMATS
  , MD_NATIVE_DATE_FORMATS
  // , MdDatepickerIntl
  , ɵx as MdPaginatorIntl
} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { UserNoteService } from './services/user-note.service';
import { ServicesRoutes } from './classes/ServicesRoutes';
import { HeadquarterService } from './services/headquarter.service';
import { StaffService } from './services/staff.service';
import { ReportsService } from './services/reports.service';

import { routes } from './data/routes';

import { CiosHeaderComponent } from './cios-header/cios-header.component';
import { CiosMenuComponent } from './cios-menu/cios-menu.component';
import { CiosUsersComponent } from './cios-users/cios-users.component';
import { CiosStaffComponent } from './cios-staff/cios-staff.component';
import { CiosQrScannerComponent } from './cios-qr-scanner/cios-qr-scanner.component';
import { CiosUserNotesComponent } from './cios-user-notes/cios-user-notes.component';
import { CiosUserActiveComponent } from './cios-user-active/cios-user-active.component';
import { CiosHeadquartersComponent } from './cios-headquarters/cios-headquarters.component';
import { CiosHeadquarterItemComponent } from './cios-headquarter-item/cios-headquarter-item.component';
import { CiosStaffItemComponent } from './cios-staff-item/cios-staff-item.component';
import { CiosFixQrComponent } from './cios-fix-qr/cios-fix-qr.component';
import { FixQrService } from './services/fix-qr.service';
import { CiosReportsComponent } from './cios-reports/cios-reports.component';

import { AuthGuard } from './guards/auth.guard';

import { MomentPipe } from './pipes/moment.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { CiosIntl } from './classes/CiosIntl';
import { CiosFooterComponent } from './cios-footer/cios-footer.component';

@NgModule({
  declarations: [
    AppComponent
    , CiosHeaderComponent
    , CiosMenuComponent
    , CiosUsersComponent
    , CiosStaffComponent
    , MomentPipe
    , DateFormatPipe
    , CiosQrScannerComponent
    , CiosUserNotesComponent
    , CiosUserActiveComponent
    , CiosHeadquartersComponent
    , CiosHeadquarterItemComponent
    , CiosStaffItemComponent
    , CiosFixQrComponent
    , CiosReportsComponent, CiosFooterComponent
  ],
  imports: [
    BrowserModule
    , NoopAnimationsModule
    , MdButtonModule
    , MdInputModule
    , MdIconModule
    , MdCardModule
    , MdGridListModule
    , MdProgressBarModule
    , MdSelectModule
    , MdPaginatorModule
    , MdTooltipModule
    , MdToolbarModule
    , MdSidenavModule
    , MdMenuModule
    , MdDatepickerModule
    // , MdNativeDateModule
    , MdSlideToggleModule

    , HttpModule
    , FormsModule
    , HttpClientXsrfModule
    , RouterModule.forRoot(
      routes,
      {
        useHash: true
      }
    )
  ],
  providers: [
    ServicesRoutes
    , UserService
    , AuthGuard
    , UserNoteService
    , HeadquarterService
    , StaffService
    , FixQrService
    , ReportsService
    , { provide: DateAdapter, useClass: NativeDateAdapter }
    , { provide: MD_DATE_FORMATS, useValue: MD_NATIVE_DATE_FORMATS }
    , { provide: LOCALE_ID, useValue: 'es-CO' }
    // , { provide: MdDatepickerIntl, useClass: CiosIntl }
    , { provide: MdPaginatorIntl, useClass: CiosIntl }
  ]
  // , schemas: [CUSTOM_ELEMENTS_SCHEMA]
  , bootstrap: [AppComponent]
})
export class AppModule {
  constructor(dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('es-CO');
  }

}
