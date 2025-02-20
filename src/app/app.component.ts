import { Component } from '@angular/core';
import {AuthService} from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-examen';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkToken();
  }
}
