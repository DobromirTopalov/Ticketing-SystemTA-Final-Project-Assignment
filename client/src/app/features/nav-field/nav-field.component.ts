import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-nav-field',
  templateUrl: './nav-field.component.html',
  styleUrls: ['./nav-field.component.css']
})
export class NavFieldComponent{

  constructor(private authService: AuthService){};
  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

}
