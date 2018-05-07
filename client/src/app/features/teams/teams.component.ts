import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/teams/teams';
import { TeamsService } from '../../core/teams.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @Input()
  teams: Team[];
  filteredTeams: Team[] = [];
  loggedUserId: number;

  columnNum: number = 1;
  rowHeightRatio: string = '1:1';

  constructor(
    private teamsService: TeamsService,
    media: ObservableMedia,
    private router: Router,
    private jwtService: JwtHelperService) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        if (change.mqAlias == 'xs') {
          this.columnNum = 1;
          this.rowHeightRatio = '2:1'
        }
        else if (change.mqAlias == 'sm') {
          this.columnNum = 2;
          this.rowHeightRatio = '1.5:1'
        }
        else {
          this.columnNum = 3;
          this.rowHeightRatio = '1:1'
        }
      });
  }

  ngOnInit(): void {
    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    this.loggedUserId = decodedToken.id;

    this.teamsService.getAll().subscribe(data => {
      const values = Object.keys(data).map((iterator) => data[iterator])[0];

      this.teams = values;

      this.teams.forEach((team) => team.Users.forEach((user) => {
        if (user.id === this.loggedUserId) {
          this.filteredTeams.push(team);
        }
      }))
    });

  }

  nav(id: number): void {
    this.router.navigate(['/teams', id])
  }

}
