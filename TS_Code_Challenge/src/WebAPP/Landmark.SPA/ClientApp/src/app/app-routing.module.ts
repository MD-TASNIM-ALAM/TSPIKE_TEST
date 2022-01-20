import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './account/guards/auth.guard';
import { LayoutsComponent } from './shared/layouts/layouts.component';

const routes: Routes = [
    { path: '', redirectTo: '/account/auth/login', pathMatch: 'full' },
    { path: 'account',  loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
    { path: 'shared',  loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
    // tslint:disable-next-line: max-line-length
    { path: 'pages', component: LayoutsComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
