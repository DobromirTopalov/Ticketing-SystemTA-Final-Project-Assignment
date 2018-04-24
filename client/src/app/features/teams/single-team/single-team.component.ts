import { Component, OnInit, Input } from '@angular/core';
import { TeamsService } from '../../../core/teams.service';
import { Team } from '../../../models/teams/teams';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { User } from '../../../models/users/user';
import { UsersService } from '../../../core/users.service';

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
  users: User[];
  columnNum: number = 0;
  rowHeightRatio: string = '1:1';

  constructor(
    private teamsService: TeamsService,
    private usersService: UsersService,
    media: ObservableMedia,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
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
      const users = Object.keys(data).map((iterator) => data[iterator])[0];
      this.users = users;
      const companyUsers = this.users.filter((x) => {
        ((x.CompanyId === this.companyId) &&
        this.team.Users.forEach((user) => {
          x.id !== user.id;
        }));
      });
      this.companyUsers = companyUsers;
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

    this.companyUsers = this.companyUsers.filter(x =>
      x.firstName.toLowerCase().indexOf(this.search) >= 0 ||
      x.lastName.toLowerCase().indexOf(this.search) >= 0 ||
      x.email.toLowerCase().indexOf(this.search) >= 0);
    console.log(this.companyUsers);
  }

  navToUser(id: number): void {
    this.router.navigate(['/users', id])
  }

}
