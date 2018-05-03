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
  // constructor(private authService: AuthService){};
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
