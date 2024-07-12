import {Pagination} from "./Pagination";
export interface ListEmpleadoRequest {
  pagination?: Pagination;
  accion?: string
  documentoId?: string
  nombres?: string
  id?: number
}
