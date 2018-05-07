import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../../core/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-nav-field',
  templateUrl: './nav-field.component.html',
  styleUrls: ['./nav-field.component.css']
})
export class NavFieldComponent {

  loggedUser: User;
  isAuth: boolean;
  loggedUserId: number;
  routerLink: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
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

    this.authService.user.subscribe(x=>{
      this.loggedUser = x;
    });

    this.authService.isAuth.subscribe(x=>{
      this.isAuth = x;
    });
    // if (this.isAuth()) {

    //   const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    //   // this.loggedUserId = decodedToken.id;
    //   // this.routerLink = `/users/${this.loggedUserId}`;

    //   // this.usersService.getById(this.loggedUserId).subscribe(
    //   //   data => {
    //   //     this.loggedUser = data['info'];
    //   //     console.log(this.loggedUser);
    //   //   });
    // }
  }

  logout(): void {
    return this.authService.logout();
  }

}
