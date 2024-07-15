import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard-page',
        pathMatch: 'full',
      },
      {
        path: 'dashboard-page',
        component: DashboardPageComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard', // Fallback to dashboard for any undefined routes
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
