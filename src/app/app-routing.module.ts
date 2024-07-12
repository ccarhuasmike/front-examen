import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
AdminLayoutComponent
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import(`./modules/auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'empleado',
        loadChildren: () =>
          import(`./modules/empleado/empleado.module`).then((m) => m.EmpleadoModule),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
