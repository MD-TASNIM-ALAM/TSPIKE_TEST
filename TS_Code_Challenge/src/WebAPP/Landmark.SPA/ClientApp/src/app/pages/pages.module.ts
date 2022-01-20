import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LandmarkComponent } from './Landmark/Landmark.component';

@NgModule({
  declarations: [LandmarkComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
})
export class PagesModule { }
