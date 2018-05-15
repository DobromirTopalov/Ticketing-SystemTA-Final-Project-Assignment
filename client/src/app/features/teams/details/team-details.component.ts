import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../../models/teams/team';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {
  @Input()
  team: Team;
  constructor() { }

  ngOnInit() {
  }

  @Output()
  showTeam = new EventEmitter();

  onShowTeam(): void {
  }
}
