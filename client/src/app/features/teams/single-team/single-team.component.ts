import { Component, OnInit, Input } from '@angular/core';
import { TeamsService } from '../../../core/teams.service';
import { Team } from '../../../models/teams/teams';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { User } from '../../../models/users/user';
import { UsersService } from '../../../core/users.service';
import { NgModel } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { TeamsModel } from '../../../models/teams/teamsModel';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {
  teams: Team[];
  team: Team;
  id: number;
  @Input()
  search = '';
  companyId: number;
  userLoggedIn: User;
  companyUsers: User[];
  filteredUsers: User[];
  users: User[];
  columnNum: number = 0;
  rowHeightRatio: string = '1:1';
  @Input()
  selectedMember: User;

  @Input()
  selected: boolean;

  constructor(
    private teamsService: TeamsService,
    private usersService: UsersService,
    media: ObservableMedia,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        // console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.columnNum = 1;
          this.rowHeightRatio = '5:1'
        }
        else if (change.mqAlias == 'sm') {
          this.columnNum = 2;
          this.rowHeightRatio = '5:1'
        }
        else {
          this.columnNum = 2;
          this.rowHeightRatio = '5:1'
        }
      });
  }

  ngOnInit(): void {
    this.showChanges();
  }

  private showChanges(): void {
    this.activatedRoute.params
      .subscribe(x => {
        this.id = x['id'];
        this.teamsService
          .getById(this.id)
          .subscribe(data => {
            const team = Object.keys(data).map((iterator) => data[iterator])[0];
            this.team = team;
            this.companyId = this.team.CompanyId;
            const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
            const userId = decodedToken.id;
            this.userLoggedIn = this.team.Users.find(x => x.id === userId)
            this.usersService
              .getAll()
              .subscribe(data => {
                this.users = data.info;
                let companyUsers = this.users
                  .filter((x) => x.CompanyId === this.companyId);
                this.companyUsers = companyUsers;
                // console.log(this.companyUsers);
                this.team.Users.forEach((teamMember) =>
                  companyUsers = companyUsers
                    .filter((companyUser) => companyUser.id !== teamMember.id));
                this.filteredUsers = companyUsers;
                // console.log(this.filteredUsers);
                // console.log(this.selectedMember);
              });
          });
      });
  }

  onSearch(): void {
    if (this.selected === true && this.search !== this.selectedMember.email) {
      this.clearFilter();
    }
    // this.selected = false;
    this.filterBySearch();
  }

  private filterBySearch(): void {
    // this.selected = false;
    // this.search = '';
    this.search = this.search.toLowerCase().trim();

    this.filteredUsers = this.filteredUsers.filter(x =>
      x.firstName.toLowerCase().indexOf(this.search) >= 0 ||
      x.lastName.toLowerCase().indexOf(this.search) >= 0 ||
      x.email.toLowerCase().indexOf(this.search) >= 0);
    // console.log(this.companyUsers);
  }

  clearFilter(): void {
    this.filteredUsers = this.filteredUsers;
    this.selected = false;
    this.selectedMember = undefined;
    this.search = '';
  }

  navToUser(id: number): void {
    this.router.navigate(['/users', id])
  }

  // to do break function into chunks to work display correctly
  selectMember(member: User, el: HTMLElement): void {
    this.selected = true;
    this.selectedMember = member;
    this.search = `${this.selectedMember.email}`
    // console.log(this.selectedMember);
  }

  inviteSelectedMember(): void {
    this.selected = false;
    this.teamsService.addUserToTeam(this.selectedMember.id, this.team.id)
    .subscribe(
      x => this.showChanges(),
      err => console.log(err)
    );
    this.clearFilter();
  }

  // to do: remove button if user is not in team

  enableButtons(): boolean {
    // const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    // const userId: number = decodedToken.id;
    // const user: User = this.team.Users.find(x => x.id === userId);
    if (this.userLoggedIn) {
      return true;
    }
    return false;
  }
  leaveTeam(team: Team) {
    // const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const userId = this.userLoggedIn.id;
    this.teamsService.userLeaveTeam(userId, this.team.id)
      .subscribe(
        x => this.showChanges(),
        err => console.log(err)
      );
  }

}
