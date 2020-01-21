import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './layout/views/dashboard/dashboard.component';
import { WizardComponent } from './layout/views/wizard/wizard.component';
import { IndexComponent} from './layout/views/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wizard', component: WizardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
