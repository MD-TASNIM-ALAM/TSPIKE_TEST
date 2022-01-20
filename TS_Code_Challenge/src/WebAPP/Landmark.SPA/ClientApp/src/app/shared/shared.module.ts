import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule, NgbToast, NgbToastModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedRoutingModule } from './shared-routing.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { RightsidebarComponent } from './layouts/rightsidebar/rightsidebar.component';
import { ToastsContainer } from './toast/toasts-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule} from 'ngx-avatar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ConfirmationDialogComponent, ToastsContainer, LayoutsComponent, SidebarComponent, TopbarComponent, FooterComponent, RightsidebarComponent],
  imports: [
    SharedRoutingModule,
    CommonModule,
    NgbModule,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ConfirmationDialogComponent],
  bootstrap: [],
  providers: [ConfirmationDialogService],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
