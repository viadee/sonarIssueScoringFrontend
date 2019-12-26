import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { WizardComponent } from './wizard/wizard.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
  MatCheckboxModule
} from "@angular/material";
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    //DashboardComponent,
    routingComponents,
    NavbarComponent,
    LoginFormComponent,
    DashboardItemComponent,
    FooterComponent,
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
