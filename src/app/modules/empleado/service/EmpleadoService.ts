import {environment} from './../../../../environments/environment';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {PaginationResult} from '../model/PaginationResult';
import {ListEmpleadoRequest} from '../model/ListEmpleadoRequest';
import {Empleado} from "../model/Empleado";
import {EmpleadoRequest} from "../model/EmpleadoRequest";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(
    private http: HttpClient
  ) {
  }
  async postObtenerEmpelado(request: ListEmpleadoRequest): Promise<Empleado> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.apiUrl}/Empleado/ListarEmpleado`, request)
        .subscribe({
          next: (data: any) => {
            if (data.success)
              return resolve(data.body.empleado);
            else
              return resolve(data.body.empleado);
          },
          error: (err) => reject(err),
        });
    });
  }
  async postInsertarEmpleado(data: EmpleadoRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.apiUrl}/Empleado/ActualizarEmpleado`, data)
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err),
        });
    });
  }

  async postListaPaginadoEmpleado(request: ListEmpleadoRequest): Promise<PaginationResult> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.apiUrl}/Empleado/ListarEmpleado`, request)
        .subscribe({
          next: (data: any) => {
            if (data.success)
              return resolve(data.body.listaEmpleado);
            else
              return resolve(data.body.listaEmpleado);
          },
          error: (err) => reject(err),
        });
    });
  }
}
