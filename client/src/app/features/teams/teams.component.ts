import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/teams/teams';
import { TeamsService } from '../../core/teams.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @Input()
  teams: Team[];

  columnNum: number = 0;
  rowHeightRatio: string;

  constructor(private teamsService: TeamsService, media: ObservableMedia, private router: Router) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        // console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.columnNum = 1;
          this.rowHeightRatio = '2:1'
        }
        else if (change.mqAlias == 'sm') {
          this.columnNum = 2;
          this.rowHeightRatio = '1.5:1'
        }
        else {
          this.columnNum = 2;
          this.rowHeightRatio = '2:1'
        }
      });
  }
  // constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.getAll().subscribe(data => {
      const values = Object.keys(data).map((iterator) => data[iterator])[0];
      this.teams = values;
    });
    // console.log(this.teams);
  }

  nav(id: number): void{
    this.router.navigate(['/teams', id])
  }

}
