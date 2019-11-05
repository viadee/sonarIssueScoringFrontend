import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
//import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    //DashboardComponent,
    routingComponents,
    NavbarComponent,
    LoginFormComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
