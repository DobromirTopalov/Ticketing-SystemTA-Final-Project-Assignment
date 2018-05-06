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
  filteredCompanyUsers: User[];
  teamMembers: User[];
  filteredUsers: User[];
  users: User[];
  teamLeaderId: number;
  loggedUserId: number;
  generateCompanyUsersList: boolean = false;
  columnNum: number = 1;
  rowHeightRatio: string = '5:1';
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
        this.id = +x['id'];
        this.teamsService
          .getById(this.id)
          .subscribe(data => {
            const team = Object.keys(data).map((iterator) => data[iterator])[0];

            this.team = team;
            // console.log(this.team);
            this.companyId = this.team.CompanyId;
            this.teamLeaderId = this.team.teamLeaderId['id'];
            // console.log(this.teamLeaderId);

            const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
            this.loggedUserId = decodedToken.id;

            this.userLoggedIn = this.team.Users.find(x => x.id === this.loggedUserId);
            // console.log(this.userLoggedIn);
            // console.log(this.loggedUserId);

            this.usersService
              .getAll()
              .subscribe(data => {
                this.users = data.info;

                let companyUsers = this.users
                  .filter((x) => x.CompanyId === this.companyId);

                this.companyUsers = companyUsers;
                this.teamMembers = this.team.Users;
                this.filteredCompanyUsers = this.companyUsers;

                this.teamMembers.forEach((teamMember) => {
                  this.filteredCompanyUsers = this.filteredCompanyUsers.filter((filtered) => filtered.id !== teamMember.id);
                });

                this.filteredUsers = this.filteredCompanyUsers;
              });
          });
      });
  }

  onSearch(): void {
    if ((this.selected === true && this.search !== this.selectedMember.email)) {
      this.clearFilter();
    }

    this.filterBySearch(this.search);
  }

  private filterBySearch(string: string): void {
    this.search = string.toLowerCase().trim();

    this.filteredUsers = this.filteredCompanyUsers.filter(x =>
      x.firstName.toLowerCase().indexOf(this.search) >= 0 ||
      x.lastName.toLowerCase().indexOf(this.search) >= 0 ||
      x.email.toLowerCase().indexOf(this.search) >= 0);
  }

  clearFilter(): void {
    this.filteredUsers = this.filteredCompanyUsers;
    this.selected = false;
    this.selectedMember = undefined;
    this.search = '';
    this.generateCompanyUsersList = false;
  }

  navToUser(id: number): void {
    this.router.navigate(['/users', id])
  }

  // to do break function into chunks to work display correctly
  selectMember(member: User, el: HTMLElement): void {
    this.selected = true;
    this.selectedMember = member;
    this.search = `${this.selectedMember.email}`
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
    if ((this.userLoggedIn) || (this.teamLeaderId === this.loggedUserId)) {
      return true;
    }

    return false;
  }
  leaveTeam(team: Team) {
    const userId = this.userLoggedIn.id;
    if (userId === this.teamLeaderId) {
      alert('You must choose another Team Leader before leaving team!')
      return;
    }

    this.teamsService.userLeaveTeam(userId, this.team.id)
      .subscribe(
        x => this.showChanges(),
        err => console.log(err)
      );
  }

  isLoggedUserTeamLeader(): boolean {
    if (this.userLoggedIn.id !== this.teamLeaderId) {
      return false;
    }

    return true;
  }

  generateUserList() {
    // console.log('button');
    this.generateCompanyUsersList = true;
  }

  promoteUser(id) {
    this.teamsService.setNewTeamLeader(id, this.team.id)
      .subscribe(
        x => this.teamsService.addUserToTeam(id, this.team.id)
          .subscribe(
            y => {
              this.generateCompanyUsersList = false;
              this.showChanges();
            },
            err => console.log(err)),
        err => console.log(err)
      );
  }

  navToTeamTickets(): void {
    this.router.navigate(['/teams', this.id, 'tickets']);
  }

  navToCreateTicket(): void {
    this.router.navigate(['/tickets/opencreate']);
  }

}
