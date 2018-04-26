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
  userFound: User;
  companyUsers: User[];
  filteredUsers: User[];
  users: User[];
  @Input()
  newMember: User;
  columnNum: number = 0;
  rowHeightRatio: string = '1:1';

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
    // to do refactor code
    this.activatedRoute.params
      .subscribe(x => {
        this.id = x['id'];
        this.teamsService
          .getById(this.id)
          .subscribe(data => {
            const team = Object.keys(data).map((iterator) => data[iterator])[0];
            this.team = team;
            // console.log(this.team);
            this.companyId = this.team.CompanyId;
            console.log(this.companyId);
          });
      });
    console.log(this.team);
    this.usersService.getAll().subscribe(data => {

      console.log(data)
      console.log("------")

      this.users = data.info;
      let companyUsers = this.users.filter((x) => x.CompanyId === this.companyId);
      console.log(this.team);
      this.team.Users.forEach((teamMember) =>
        companyUsers = companyUsers
          .filter((companyUser) => companyUser.id !== teamMember.id));
      // companyUsers = companyUsers.filter((x) => this.team.Users.forEach((user) => x.id === user.id));
      this.companyUsers = companyUsers;
      this.filteredUsers = companyUsers;
      console.log(this.companyUsers);
    });
  }

  ngAfterViewInit() {

  }

  onSearch(): void {
    this.filterBySearch();
  }

  private filterBySearch(): void {
    this.search = this.search.toLowerCase().trim();

    this.filteredUsers = this.companyUsers.filter(x =>
      x.firstName.toLowerCase().indexOf(this.search) >= 0 ||
      x.lastName.toLowerCase().indexOf(this.search) >= 0 ||
      x.email.toLowerCase().indexOf(this.search) >= 0);
    console.log(this.companyUsers);
  }

  clearFilter(): void {
    this.search = '';
    this.filteredUsers = this.companyUsers;
    this.selected = false;
  }

  navToUser(id: number): void {
    this.router.navigate(['/users', id])
  }
  showChanges(id: number): void {
    this.router.navigate(['/teams', id])
  }

  // to do break function into chunks to work display correctly
  selectMember(member: User, el: HTMLElement): void {
    console.log(member);
    console.log(el);
    this.selected = true;
    this.teamsService.addUserToTeam(member.id, this.team.id)
      .subscribe(
        // x => console.log(x),
        x => this.showChanges(this.team.id),
        err => console.log(err)
      );
    // this.router.navigate(['/teams', this.team.id])
    console.log(this.team.id);
    console.log(member.id);
    // el.setAttribute('disabled', 'true');
  }

  // to do: remove button if user is not in team
  leaveTeam(team: Team) {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const userId = decodedToken.id;
    console.log(userId);
    this.teamsService.userLeaveTeam(userId, this.team.id)
      .subscribe(
        x => this.showChanges(this.team.id),
        err => console.log(err)
      );
  }

}
