import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/users/user';
import { UsersService } from '../../../core/users.service';
import { Company } from '../../../models/company/company';
import { TeamsService } from '../../../core/teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  userLoggedIn: User[];
  loggedUserId: number;
  userCompanyId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtHelperService,
    private usersService: UsersService,
    private teamsService: TeamsService) { }

  ngOnInit() {
    const teamNameRegex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9 _-]{0,39}/);

    this.createTeamForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(teamNameRegex)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      teamImgUrl: '',
    });

    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const loggedUserEmail = decodedToken.email;

    this.usersService.getByEmail(loggedUserEmail).subscribe(data => {
      this.userLoggedIn = data.info;
      this.loggedUserId = data.info.id;
      this.userCompanyId = data.info.Company.id;
    });

  }

  createTeam(): void {
    const name: string = this.createTeamForm.value.name;
    const description: string = this.createTeamForm.value.description;
    const CompanyId: number = this.userCompanyId;
    const TeamLeaderId: number = this.loggedUserId;
    let newTeamId: number = 0;

    const modelObject = {
      name,
      description,
      TeamLeaderId,
      CompanyId,
    }

    this.teamsService.createNewTeam(name, description, CompanyId, TeamLeaderId)
      .subscribe(
        x => this.teamsService.addUserToTeam(this.loggedUserId, x['team'][0].id)
          .subscribe(
            y => this.router.navigate(['/teams', x['team'][0].id]),
            err => console.log(err)
          ),
        err => console.log(err),
    );

  }

  displayErrorMessageName() {
    return this.createTeamForm.get('name').hasError('required') ? 'Please enter a name' :
      this.createTeamForm.get('name').hasError('minLength') ? 'Min 2 symbols required' :
        this.createTeamForm.get('name').hasError('pattern') ? 'Please enter only letters, numbers, - or _' :
          this.createTeamForm.get('name').hasError('maxLength') ? 'Max 40 symbols allowed' : '';
  }

  displayErrorMessageDescription() {
    return this.createTeamForm.get('description').hasError('required') ? 'Please enter a description' :
      this.createTeamForm.get('description').hasError('minLength') ? 'Min 2 symbols required' :
        this.createTeamForm.get('description').hasError('maxLength') ? 'Max 200 symbols allowed' : '';
  }

}
