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
      apiKey: 'AIzaSyBhR9GgfblgfVy0o4E0ctL_RyLlv5CiLcA'
    })
  ]
})
export class LandmarkModule { }
