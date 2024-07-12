import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./core/auth.module";
import { SharedModule } from "@shared/shared.module";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
