import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';  //

//Material
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
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomepageComponent } from './layout/views/homepage/homepage.component';
import { AnalysisComponent } from './layout/views/analysis/analysis.component';


@NgModule({
  declarations: [
    AppComponent,
    //DashboardComponent,
    routingComponents,
    NavbarComponent,
    DashboardItemComponent,
    FooterComponent,
    HomepageComponent,
    AnalysisComponent,
    //WizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
