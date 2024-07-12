import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {ListUsuarioRequest} from "../modules/auth/model/ListUsuarioRequest";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) { }
  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  signIn(request: ListUsuarioRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Usuario/ValidarUsuario`, request).pipe(
      tap(response => {
        debugger;
          if(response.success){
            localStorage.setItem('token', response.body.usuario);
            this.loggedIn.next(true);
            this.router.navigate(['/empleado/bandejaempleado'])
          }else{
            this._snackBar.open(response.message, "");
          }
      })
    );
  }
  signOut(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }
}
