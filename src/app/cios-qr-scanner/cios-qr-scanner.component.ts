import {
  Component
  , OnInit
  , OnDestroy
  // , ViewEncapsulation
  , NgZone
} from '@angular/core';
import { IUserActive, IUserNote } from '../interfaces/IUserActive';

import { environment } from 'environments/environment';

// import * as Instascan from 'instascan';

import { UserService } from '../services/user.service';

import swal from 'sweetalert2';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IGenericResponse } from '../interfaces/IGenericResponse';
import { UserNoteService } from '../services/user-note.service';

declare var Instascan: any;

@Component({
  selector: 'cios-qr-scanner',
  templateUrl: './cios-qr-scanner.component.html',
  styleUrls: ['./cios-qr-scanner.component.scss']
  , providers: [UserNoteService]
})
export class CiosQrScannerComponent implements OnInit, OnDestroy {

  public user: IUserActive;
  public userFoundIt = false;
  public scanning = false;
  public scanner: any;
  public error = false;
  public cameras: any;
  public loadingData = false;

  scannerId: string = 'scanner-' + new Date().getTime() + Math.round((Math.random() * 10000));

  public loggedUser: IUser;

  private cameraIndex = 0;
  private currentCamera: any;

  private userLoggedSuscription: Subscription;
  private getUserSubscription: Subscription;
  private refreshUserSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _userNoteService: UserNoteService,
    private _ngZone: NgZone
  ) {
    this.scanner = null;
  }

  private initScanner() {
    // console.log('initScan');
    if (!this.scanner) {
      // console.log('initScanner');
      this.scanner = new Instascan.Scanner({
        mirror: false
        , video: document.getElementById(this.scannerId)
      });

      this.scanner.addListener('scan', (id) => this.onScan(id));

      Instascan.Camera.getCameras().then(cameras => {
        this.cameras = cameras;
        if (cameras.length) {
          this.cameraIndex = cameras.length === 2 ? 1 : 0;
          this.currentCamera = cameras[this.cameraIndex];
          this.scanner.start(this.currentCamera);
        } else {
          this.error = true;
          console.error('NO se encontraron camaras disponibles');
        }

      }).catch(error => console.error(error));
    } else {
      // console.log('Start Cam');
      this.scanner.start(this.currentCamera);
    }
  }



  private onScan(id: number) {
    this.loadingData = true;
    this.getUserSubscription = this._userService.getOne(id).subscribe((user: IUserActive) => {
      this._ngZone.run(() => {
        // this.stopCamera();
        this.user = user;
        this.loadingData = false;
        this.userFoundIt = true;
      });
    }, (error: any) => {
      swal({
        title: 'Usuario no encontrado'
        , text: 'No se pudo encontrar el usuario escaneado'
        , type: 'warning'
        , timer: 5000
      });
    });
  }

  getScanButtonText(): string {
    return this.scanning ? 'Detener/Cancelar' : 'Escanear';
  }

  getScanButtonColor(): string {
    return this.scanning ? 'warn' : 'primary';
  }

  getScanButtonStyles(): object {
    return {
      opacity: this.scanning ? .6 : 1
    };
  }

  switchCamera() {
    this.cameraIndex++;
    if (this.cameraIndex > this.cameras.length) {
      this.cameraIndex = 0;
    }
    this.currentCamera = this.cameras[this.cameraIndex];
    this.stopCamera(true);
    // this.scan();
  }

  private stopCamera(restart: boolean = false) {
    if (!this.scanner) {
      return;
    }
    this.scanner.stop().then(() => {
      if (restart) {
        this.scan();
      }
    });
  }

  onCancel($event: boolean) {
    this.userFoundIt = false;
    this.user = null;
  }

  scan() {
    if (this.error) {
      return;
    }
    if (!this.scanning) {
      // console.log('Scan function');
      this.initScanner();
      // setTimeout(this.initScanner.bind(this), 2000);
    } else {
      this.stopCamera();
    }
    this.scanning = !this.scanning;
  }

  onUserUpdated(user: IUserActive) {
    this._userService.refreshUser(user);
  }

  ngOnInit() {
    this.userLoggedSuscription = this._userService.get().subscribe((response: IUserResponse) => {
      this.loggedUser = response.user;
    });

    this.refreshUserSubscription = this._userService.getRefreshUser().subscribe((user: IUserActive) => {
      if (this.user && this.user.id === user.id) {
        for (const i in user) {
          if (user.hasOwnProperty(i)) {
            this.user[i] = user[i];
          }
        }
      }
    });
    if (!environment.production) {
      // this.scan();
    }
  }

  ngOnDestroy() {
    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }
    if (this.userLoggedSuscription) {
      this.userLoggedSuscription.unsubscribe();

    }
    if (this.refreshUserSubscription) {
      this.refreshUserSubscription.unsubscribe();
    }
  }

}
