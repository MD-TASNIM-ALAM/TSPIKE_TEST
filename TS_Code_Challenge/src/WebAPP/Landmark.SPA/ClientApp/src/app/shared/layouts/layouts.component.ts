import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  isCondensed = false;

  constructor() { }

  ngOnInit() {
  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    document.body.classList.remove('authentication-bg');
    document.body.classList.remove('authentication-bg-pattern');

    if (!this.isMobile()) {
      document.body.classList.add('sidebar-enable');
    }
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
    if (!this.isMobile()) {
      document.body.classList.toggle('enlarged');
      this.isCondensed = !this.isCondensed;
    }
  }

}
