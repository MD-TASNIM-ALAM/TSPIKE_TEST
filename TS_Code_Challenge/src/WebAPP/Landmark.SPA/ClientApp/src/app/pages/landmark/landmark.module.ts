import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandmarkRoutingModule } from './Landmark-routing.module';
import { AgmCoreModule } from '@agm/core';
import { LandmarkRemarkComponent } from './Landmark-remark/Landmark-remark.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandmarkRemarkComponent],
  imports: [
    CommonModule,
    LandmarkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:
    })
  ]
})
export class LandmarkModule { }
