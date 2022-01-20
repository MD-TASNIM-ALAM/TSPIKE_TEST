import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/account/services/auth.service';
import { User, UserWithToken } from 'src/app/account/models/auth.models';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AvatarService, AvatarComponent } from 'ngx-avatar';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  notificationItems: Array<{}>;
  languages: Array<{
    id: number,
    flag?: string,
    name: string
  }>;
  selectedLanguage: {
    id: number,
    flag?: string,
    name: string
  };

    openMobileMenu: boolean;
    user: User;
    userWithToken: UserWithToken;
    displayName: string[];
    avatar: string;
    largeLogo: any;
    smallLogo: any;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private authService: AuthenticationService, public sanitizer: DomSanitizer) {

      this.userWithToken = JSON.parse(localStorage.getItem('currentUserWithToken')) as UserWithToken;
      this.user = this.userWithToken.user;
      if ( this.user != null ) {
          this.displayName = this.user.displayName.split(' ');
          if ( this.displayName.length > 1) {
            this.avatar = this.displayName[0].substr(0, 1) + this.displayName[1].substr(0, 1);
          } else {

            this.avatar = this.displayName[0].substr(0, 1);
          }
        }
      }

  ngOnInit() {
    this.openMobileMenu = false;
  }

  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
  }
}
