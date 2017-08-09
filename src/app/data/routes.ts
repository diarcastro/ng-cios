import { Routes } from '@angular/router';

import { CiosUsersComponent } from '../cios-users/cios-users.component';
import { CiosStaffComponent } from '../cios-staff/cios-staff.component';
import { AuthGuard } from '../guards/auth.guard';
import { CiosHeadquartersComponent } from '../cios-headquarters/cios-headquarters.component';
import { CiosFixQrComponent } from '../cios-fix-qr/cios-fix-qr.component';


export const routes: Routes = [
  {
    path: ''
    , component: CiosUsersComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'index.php'
    , component: CiosUsersComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'sedes'
    , component: CiosHeadquartersComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'personal'
    , component: CiosStaffComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'fix-qr'
    , component: CiosFixQrComponent
    , canActivate: [AuthGuard]
  }
];
