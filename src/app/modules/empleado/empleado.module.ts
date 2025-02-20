import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTreeModule} from '@angular/material/tree';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {DatePipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {BandejaEmpleadoComponent} from "./page/bandejaempleado-page/bandejaempleado.component";
import {RegistroEmpleadoComponent} from "./page/registroempleado-page/registroempleado.component";
import {EmpleadosRoutingModule} from "./empleado-routing.module";
import {DecimalPipe} from '@angular/common';
import {getDutchPaginatorIntl} from "./service/es-paginator-intl";
import {SharedModule} from "@shared/shared.module";
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    BandejaEmpleadoComponent,
    RegistroEmpleadoComponent,
  ],
  imports: [
    NgxSkeletonLoaderModule.forRoot({animation: 'pulse', loadingText: 'This item is actually loading...'}),
    MatRadioModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    NgProgressModule,
    NgProgressHttpModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    RouterModule.forChild(EmpleadosRoutingModule),
    MatTooltipModule,
    SharedModule,
  ],
  providers: [
    DecimalPipe,
    {provide: MAT_DATE_LOCALE, useValue: 'es-pe'},
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    MatDatepickerModule,
    DatePipe,
  ],
})
export class EmpleadoModule {
}
