import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Team } from '../../../models/teams/team';
import { TeamsService } from '../../../core/teams.service';
import { SnackBarComponentExample } from '../../snackbar/snackbar/snack-bar-component-example';

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


  invalidMessage: string;
  @ViewChild(SnackBarComponentExample) child: SnackBarComponentExample;

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
    this.loggedUserId = +decodedToken.id;

    this.teamsService.getAll().subscribe(data => {
      this.teams = data.info;

      this.teams.forEach((team) => team.Users.forEach((user) => {
        if (user.id === this.loggedUserId) {
          this.filteredTeams.push(team);
        }
      }))

      if (!this.filteredTeams.length) {
        this.invalidMessage = 'No teams found!You can create one from the menu above or wait untill someone with more privileges adds you to an existing team!';
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();
      }
    });

  }

  nav(id: number): void {
    this.router.navigate(['/teams', id])
  }

}
