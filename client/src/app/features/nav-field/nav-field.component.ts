import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-field',
  templateUrl: './nav-field.component.html',
  styleUrls: ['./nav-field.component.css']
})
export class NavFieldComponent{

  // constructor(private authService: AuthService){};
  constructor(private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'hamburger',
        sanitizer.bypassSecurityTrustResourceUrl('../../../assets/sidenavicon.svg'));
  }  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

}
