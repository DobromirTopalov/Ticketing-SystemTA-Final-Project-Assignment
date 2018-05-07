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

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtHelperService,
    private usersService: UsersService,
    private teamsService: TeamsService) { }

  ngOnInit() {
    const teamNameRegex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9 _-]{0,19}/);
    // const teamDescRegex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9 _-.,]{0,99}/);

    this.createTeamForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(teamNameRegex)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      teamImgUrl: '',
    });

    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const loggedUserEmail = decodedToken.email;

    this.usersService.getByEmail(loggedUserEmail).subscribe(data => {
      this.userLoggedIn = data.info;
      this.loggedUserId = this.userLoggedIn['id'];
      this.userCompanyId = this.userLoggedIn['Company'].id;
    });

  }

  createTeam(): void {
    // if (this.createTeamForm.) {

    // }
    const name: string = this.createTeamForm.value.name;
    const description: string = this.createTeamForm.value.description;
    const teamImgUrl: string | null = this.createTeamForm.value.teamImgUrl;
    const CompanyId: number = this.userCompanyId;
    const TeamLeaderId: number = this.loggedUserId;
    let newTeamId: number = 0;

    console.log(this.createTeamForm);
    console.log(this.createTeamForm.hasError);

    const modelObject = {
      name,
      description,
      teamImgUrl,
      TeamLeaderId,
      CompanyId,
    }
    this.teamsService.createNewTeam(name, description, teamImgUrl, CompanyId, TeamLeaderId)
      .subscribe(
        x => this.teamsService.addUserToTeam(this.loggedUserId, x['team'][0].id)
          // x => console.log(x['team'][0].id),
          .subscribe(
            y => this.router.navigate(['/teams', x['team'][0].id]),
            err => console.log(err)
          ),
        err => console.log(err),
    );
    // this.teamsService.createNewTeam(name, description, teamImgUrl, CompanyId, TeamLeaderId).subscribe(
    //   x => this.router.navigate(['/teams', x['team'][0].id]),
    //   err => console.log(err),
    // );
    ;
  }

  displayErrorMessageName() {
    return this.createTeamForm.get('name').hasError('required') ? 'Please enter a name' :
      this.createTeamForm.get('name').hasError('minLength') ? 'Min 2 symbols required' :
        this.createTeamForm.get('name').hasError('pattern') ? 'Please enter only letters, numbers, - or _' :
          this.createTeamForm.get('name').hasError('maxLength') ? 'Max 20 symbols allowed' : '';
  }
  displayErrorMessageDescription() {
    return this.createTeamForm.get('description').hasError('required') ? 'Please enter a description' :
      this.createTeamForm.get('description').hasError('minLength') ? 'Min 2 symbols required' :
        this.createTeamForm.get('description').hasError('maxLength') ? 'Max 100 symbols allowed' : '';
  }

  // createTeamForm: FormGroup = new FormGroup({
  //   name: new FormControl(),
  //   description: new FormControl(),
  //   teamImgUrl: new FormControl(),
  // })
}
