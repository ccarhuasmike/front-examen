import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/auth.service";
import {ListEmpleadoRequest} from "../../../empleado/model/ListEmpleadoRequest";
import {ListUsuarioRequest} from "../../model/ListUsuarioRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
//import {AuthService} from "@core/auth/auth.service";
// import {BootstrapNotifyBarService} from "@shared/services/bootstrap-notify.service";
// import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  returnUrl: string = '/';
  datosGeneralesFormGroup!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    //private bootstrapNotifyBarService: BootstrapNotifyBarService,
    //private cookieService: CookieService
  ) {

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.crearFormulario();
  }

  crearFormulario() {
    this.datosGeneralesFormGroup = this._formBuilder.group({
      usuario: ['', Validators.required],//Cargo de Personal es obligatoria
      password: ['', Validators.required],//Seleccione la Condicion
    });
  }

  async login() {
    if (!this.datosGeneralesFormGroup.valid)
      return;
    this.isSubmitted = true;
    let listUsuarioRequest: ListUsuarioRequest = {
      accion: "ValidarUsuario",
      usuario: this.datosGeneralesFormGroup.value.usuario,
      password: this.datosGeneralesFormGroup.value.password
    };
    this.authService.signIn(listUsuarioRequest).subscribe(
      () => {
        debugger;
      },
      error => {
        debugger;
        console.error('Login error', error);
      }
    );
    // await this.authService.signIn(listUsuarioRequest).then((response: any) => {
    //   debugger;
    //   if(response.success){
    //     this.router.navigate(['/empleado/bandejaempleado'])
    //   }else{
    //     this._snackBar.open(response.message, "");
    //   }
    //   this.isSubmitted = false;
    // }, (error: any) => {
    //
    // });
  }
}
