import {Routes} from '@angular/router';
import {BandejaEmpleadoComponent} from "./page/bandejaempleado-page/bandejaempleado.component";
import {RegistroEmpleadoComponent} from "./page/registroempleado-page/registroempleado.component";
import {AuthGuard} from "../../core/auth/auth.guard";

export const EmpleadosRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registroempleado/:id',
        component: RegistroEmpleadoComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: {
            label: 'Registro Distribución',
          }
        }
      },
      {
        path: 'bandejaempleado',
        component: BandejaEmpleadoComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: {
            label: 'Mis Solicitudes',
          }
        }
      }
    ],
  },
];
