import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewGraphComponent } from './view-graph/view-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';

import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardPageComponent,
    ViewGraphComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    NgApexchartsModule,
    HttpClientModule
  ],
})
export class DashboardModule {}
