import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {DashboardItemComponent} from './views/dashboard-item/dashboard-item.component';
import {HomepageComponent} from './views/homepage/homepage.component';
import {AnalysisComponent} from './views/analysis/analysis.component';

import {RepositoryModule} from '../repository/repository.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardItemComponent,
    HomepageComponent,
    AnalysisComponent
  ],
  imports: [
    CommonModule,
    RepositoryModule
  ],
  exports: []
})
export class LayoutModule {
}
