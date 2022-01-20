import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandmarkRemarkComponent } from './Landmark-remark/Landmark-remark.component';


const routes: Routes = [
  { path: 'remark', component: LandmarkRemarkComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandmarkRoutingModule { }
