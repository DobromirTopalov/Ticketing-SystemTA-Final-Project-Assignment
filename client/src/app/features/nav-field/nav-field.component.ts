import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav-field',
  templateUrl: './nav-field.component.html',
  styleUrls: ['./nav-field.component.css']
})
export class NavFieldComponent{

  // constructor(private authService: AuthService){};
  constructor(private http: HttpClient, private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'hamburger',
        sanitizer.bypassSecurityTrustResourceUrl('../../../assets/sidenavicon.svg'));
  }  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  testAuth(): void {
    this.http.get<any>('http://localhost:3200/test').subscribe(x => {
      console.log('insideAuthAngular');
      // console.log(x);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  logout(): void {
    return this.authService.logout();
  }

}
