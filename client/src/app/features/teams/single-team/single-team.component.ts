import { NgModel } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Team } from '../../../models/teams/team';
import { TeamsDBModel } from '../../../models/teams/teamsDBModel';
import { TeamsService } from '../../../core/teams.service';
import { User } from '../../../models/users/user';
import { UsersService } from '../../../core/users.service';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {
  @Input()
  search = '';
  team: Team[];
  teamsId: number;

  id: number;
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
  rowHeightRatio: string = '7:1';

  @Input()
  selectedMember: User;

  @Input()
  selected: boolean;


  constructor(
    private teamsService: TeamsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService,
    media: ObservableMedia) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        if (change.mqAlias == 'xs') {
          this.columnNum = 1;
          this.rowHeightRatio = '7:1'
        }
        else if (change.mqAlias == 'sm') {
          this.columnNum = 2;
          this.rowHeightRatio = '7:1'
        }
        else {
          this.columnNum = 2;
          this.rowHeightRatio = '7:1'
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
            this.team = data.info;
            this.teamsId = data.info.id;

            this.companyId = data.info.CompanyId;
            this.teamLeaderId = data.info.teamLeaderId.id;

            const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
            this.loggedUserId = decodedToken.id;
            this.userLoggedIn = data.info.Users.find(x => x.id === this.loggedUserId);

            this.teamMembers = data.info.Users;
            this.usersService
            .getAll()
            .subscribe(data => {
              this.users = data.info;

              let companyUsers = this.users
              .filter((x) => x.CompanyId === this.companyId);

              this.companyUsers = companyUsers;
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

  selectMember(member: User, el: HTMLElement): void {
    this.selected = true;
    this.selectedMember = member;
    this.search = `${this.selectedMember.email}`
  }

  inviteSelectedMember(): void {
    this.selected = false;
    this.teamsService.addUserToTeam(this.selectedMember.id, this.teamsId)
      .subscribe(
        x => this.showChanges(),
        err => console.log(err)
      );

    this.clearFilter();
  }

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

    this.teamsService.userLeaveTeam(userId, this.teamsId)
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
    this.generateCompanyUsersList = true;
  }

  promoteUser(id) {
    this.teamsService.setNewTeamLeader(id, this.teamsId)
      .subscribe(
        x => this.teamsService.addUserToTeam(id, this.teamsId)
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
