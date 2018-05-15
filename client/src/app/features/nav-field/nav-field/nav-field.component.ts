import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../../models/users/user';

@Component({
  selector: 'app-nav-field',
  templateUrl: './nav-field.component.html',
  styleUrls: ['./nav-field.component.css']
})
export class NavFieldComponent {
  loggedUser: User;
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, ) {

    iconRegistry.addSvgIcon(
      'hamburger',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/sidenavicon.svg'));

    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/logout.svg'));

    iconRegistry.addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/menu.svg'));

    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/logo.svg'));

    iconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/profile.svg'));

    iconRegistry.addSvgIcon(
      'login',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/key.svg'));

    iconRegistry.addSvgIcon(
      'register',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/register.svg'));
  }

  ngOnInit() {
    this.authService.user.subscribe(data => {
      this.loggedUser = data;
    });

    this.authService.isAuth.subscribe(data => {
      this.isAuth = data;
    });
  }

  logout(): void {
    return this.authService.logout();
  }

}
