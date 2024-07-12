import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListEmpleadoRequest} from "../../model/ListEmpleadoRequest"
import {EmpleadoService} from "../../service/EmpleadoService";
@Component({
  selector: 'app-bandejaempleado',
  templateUrl: './bandejaempleado.component.html',
  styleUrls: ['./bandejaempleado.component.css'],
})
export class BandejaEmpleadoComponent implements OnInit, OnDestroy {
  listEmpleadoRequest: ListEmpleadoRequest = {
    accion: "ListarPaginadoEmpleado",
    pagination: {
      pageNumber: 1,
      pageSize: 10
    }
  };
  matexpansionpanelfiltro: boolean = false;
  isLoading = false;
  public totalRegistros: number = 0;
  public dataSource: any = [];
  displayedColumns: string[] =
    [
      'docuemento',
      'nombre',
      'apellido',
      'edad',
      'fechanacimiento',
      'salario'
    ];

  constructor(
    private empleadoService: EmpleadoService
  ) {
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
