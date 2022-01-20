import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { AuthenticationService } from './account/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Landmark';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(private idle: Idle, private router: Router, private authenticationService: AuthenticationService) {

  // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(300);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      if ( this.authenticationService.getUserLoggedIn()) {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
      }
    });

    idle.onTimeout.subscribe(() => {
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.logout();
    });

    idle.onIdleStart.subscribe(() => {
      if ( this.authenticationService.getUserLoggedIn()) {
        this.idleState = 'You\'ve gone idle!';
        console.log(this.idleState);
        this.childModal.show();
      } else {
        idle.stop();
      }
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    let userLoggedIn =  this.authenticationService.getUserLoggedIn();
    if (userLoggedIn) {
        idle.watch();
        this.timedOut = false;
        } else {
          idle.stop();
        }
    this.reset();

  }

  reset() {
    this.idle.watch();
    // xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    // this.idle.stop();
    this.authenticationService.setUserLoggedIn(false);
    this.authenticationService.logout();
   }

}
