import {Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NgProgress, NgProgressRef} from '@ngx-progressbar/core';
import {ActivatedRoute} from '@angular/router';
import {Empleado} from "../../model/Empleado";
import {EmpleadoService} from "../../service/EmpleadoService";
import {EmpleadoRequest} from "../../model/EmpleadoRequest";
import {DialogoConfirmacionComponent} from "@shared/components/dialogo-confirmacion/dialogo-confirmacion.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe, DecimalPipe} from "@angular/common";
@Component({
  selector: 'app-registrounidadmantenimiento',
  templateUrl: './registroempleado.component.html',
  styleUrls: ['./registroempleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

  datosGenerales!: Empleado;
  registrarDatosGenerales!: EmpleadoRequest;
  contentLoaded: boolean = false;
  isSubmitted: boolean = false;
  progressRef!: NgProgressRef;
  value: number = 0;
  datosGeneralesFormGroup!: UntypedFormGroup;
  IdEmpleado: number = 0;
  constructor(
    private ngProgress: NgProgress,
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    public dialogo: MatDialog,
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) {

  }
  ngOnDestroy(): void {
    this.ngProgress.destroyAll();
  }

  async ngOnInit() {
    this.progressRef = this.ngProgress.ref();
    this.progressRef.state.subscribe((state: any) => {
      this.value = state.value;
    });
    this.crearFormulario();
    this.IdEmpleado = this.route.snapshot.paramMap.get('id') == null ? 0 : parseInt(<string>this.route.snapshot.paramMap.get('id')?.toString());
    this.datosGenerales = await this.empleadoService.postObtenerEmpelado({
      accion: "ObtenerEmpleadoPorId",
      id: this.IdEmpleado
    });
    this.contentLoaded = true;
    if (this.IdEmpleado > 0) {
      this.setFormulario(this.datosGenerales);
    }
  }

  setFormulario(data: Empleado) {
    this.datosGeneralesFormGroup.patchValue({
      documentoId: data.documentoId,
      nombres: data.nombres,
      apellidos: data.apellidos,
      edad: data.edad,
      fechaNacimiento: data.fechaNacimiento,
      salario: data.salario,
    });
  }

  crearFormulario() {
    this.datosGeneralesFormGroup = this._formBuilder.group({
      documentoId: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  registroDatosGenerales() {
    if (!this.datosGeneralesFormGroup.valid)
      return;
    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: this.IdEmpleado == 0 ? `Se grabara los datos. Desea continuar?` : "Se actualizara los datos. Desea continuar?"
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: boolean) => {
        if (confirmado) {
          this.isSubmitted = true;
          this.progressRef.start();
          let fechaNacimiento = this.datosGeneralesFormGroup.value.fechaNacimiento === "" ? undefined : this.datePipe.transform(this.datosGeneralesFormGroup.value.fechaNacimiento, 'yyyy-MM-dd')?.toString();
          this.registrarDatosGenerales = {
            empleado: {
              id: this.IdEmpleado,
              accion: this.IdEmpleado == 0 ? "Registrar" : "Actualizar",
              documentoId: this.datosGeneralesFormGroup.value.documentoId,
              nombres: this.datosGeneralesFormGroup.value.nombres,
              apellidos: this.datosGeneralesFormGroup.value.apellidos,
              fechaNacimiento: fechaNacimiento,
              edad: this.datosGeneralesFormGroup.value.edad,
              salario: this.datosGeneralesFormGroup.value.salario,
            }
          }
          let response = await this.empleadoService.postInsertarEmpleado(this.registrarDatosGenerales);
          if (response.success)
            this._snackBar.open(response.message, "");
          else
            this._snackBar.open(response.message, "");
          this.isSubmitted = false;
          this.progressRef.complete();
        }
      });
  }
}
