import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  userId: number;
  loggedUserId: number;
  user: User[];
  loggerUser: User[];
  userCompanyId: number;
  loggedUserCompanyId: number;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService) { }

  ngOnInit() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    this.loggedUserId = decodedToken.id;

    this.activatedRoute.params.subscribe(
      param => {
        this.userId = +param.id;

        this.usersService.getById(this.loggedUserId).subscribe(
          data => {
            this.loggerUser = data.info;
            this.loggedUserCompanyId = this.loggerUser['CompanyId'];

            this.usersService.getById(this.userId).subscribe(
              data => {
                this.user = data.info;
                this.userCompanyId = this.user['CompanyId'];
              });
          });
      });
  }

  showUser(): boolean {
    if (this.userCompanyId !== this.loggedUserCompanyId) {
      return false;
    }

    return true;
  }
}
