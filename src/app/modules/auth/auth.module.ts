import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {LoginComponent} from "./page/login/login.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
