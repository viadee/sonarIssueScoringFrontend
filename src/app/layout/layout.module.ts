import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {DashboardItemComponent} from './views/dashboard-item/dashboard-item.component';
import {HomepageComponent} from './views/homepage/homepage.component';
import {WizardComponent} from './views/wizard/wizard.component';
import {RepositoryModule} from '../repository/repository.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatTabsModule,
  MatDialogModule,
  MatInputModule,
  MatStepperModule,
  MatExpansionModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardItemComponent,
    HomepageComponent,
    WizardComponent
  ],
  imports: [
    CommonModule,
    RepositoryModule,
    AppRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [NavbarComponent]
})
export class LayoutModule {
}
