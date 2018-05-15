import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../../../core/users.service';
import { User } from '../../../models/users/user';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  userId: number;
  user: User[];
  userCompanyId: number;
  loggedUserId: number;
  loggedUserCompanyId: number;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService) { }

  ngOnInit() {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    this.loggedUserId = +decodedToken.id;

    this.activatedRoute.params.subscribe(
      param => {
        this.userId = +param.id;

        this.usersService.getById(this.loggedUserId).subscribe(
          data => {
            this.loggedUserCompanyId = data.info.CompanyId;

            this.usersService.getById(this.userId).subscribe(
              data => {
                this.user = data.info;
                this.userCompanyId = data.info.CompanyId;
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
