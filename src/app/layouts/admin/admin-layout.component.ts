import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements OnInit {
  location: Location;
  @ViewChild('sidebar') sidebar: any;
  constructor(private router: Router, location: Location,private authService: AuthService) {
    this.location = location;
  }
  ngOnInit() {
  }
  CerrarSesion(){
    this.authService.signOut();
  }
}
