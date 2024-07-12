import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListEmpleadoRequest} from "../../model/ListEmpleadoRequest"
import {EmpleadoService} from "../../service/EmpleadoService";
import {DialogoConfirmacionComponent} from "@shared/components/dialogo-confirmacion/dialogo-confirmacion.component";
import {MatDialog} from "@angular/material/dialog";
import {EmpleadoRequest} from "../../model/EmpleadoRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-bandejaempleado',
  templateUrl: './bandejaempleado.component.html',
  styleUrls: ['./bandejaempleado.component.css'],
})
export class BandejaEmpleadoComponent implements OnInit, OnDestroy {
  registrarDatosGenerales!: EmpleadoRequest;
  listEmpleadoRequest: ListEmpleadoRequest = {
    accion: "ListarPaginadoEmpleado",
    pagination: {
      pageNumber: 1,
      pageSize: 5
    }
  };
  matexpansionpanelfiltro: boolean = false;
  isLoading = false;
  public totalRegistros: number = 0;
  public dataSource: any = [];
  displayedColumns: string[] =
    [
      'select',
      'docuemento',
      'nombre',
      'apellido',
      'edad',
      'fechanacimiento',
      'salario'
    ];

  constructor(
    private empleadoService: EmpleadoService,
    public dialogo: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }

  btnEliminar(row:any){
    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Mensaje de Confirmación`,
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: boolean) => {
        if (confirmado) {

          this.registrarDatosGenerales = {
            empleado: {
              accion:"EliminarEmpleado",
              id: row.id
            }
          }
          let response = await this.empleadoService.postInsertarEmpleado(this.registrarDatosGenerales);
          if (response.success) {
            this._snackBar.open(response.message, "", {
              duration: 1000
            });
            this.loadDatos();
          } else
            this._snackBar.open(response.message, "", {
              duration: 1000
            });
        }
      });

  }
  async LimpiarControles() {
    this.listEmpleadoRequest.nombres = '';
    this.listEmpleadoRequest.documentoId = '';
    this.dataSource = [];
  }
  loadDatos(): void {
    // this.isLoading = true;
    this.dataSource = [];
    this.matexpansionpanelfiltro = false;
    this.empleadoService.postListaPaginadoEmpleado(this.listEmpleadoRequest).then((res) => {
      this.isLoading = false;
      this.dataSource = res.rows;
      this.totalRegistros = res.totalRowCount;
    });
  }
  pageChanged(event: any): void {
    this.listEmpleadoRequest.pagination!.pageNumber = event.pageIndex + 1;
    this.listEmpleadoRequest.pagination!.pageSize = event.pageSize;
    this.loadDatos();
  };
  ngOnDestroy(): void {
  }
  async ngOnInit() {
    this.loadDatos();
  }
}
