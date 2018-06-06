import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ParamsService } from '../../../core/params.service';
import { CompaniesDBModel } from '../../../models/company/companiesDBModel';
import { Company } from '../../../models/company/company';
import { UsersService } from '../../../core/users.service';
import { User } from '../../../models/users/user';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Team } from '../../../models/teams/team';
import { TeamsService } from '../../../core/teams.service';
import { TicketsService } from '../../../core/tickets.service';
import { Ticket } from '../../../models/tickets/ticket';
import { UsersDBModel } from '../../../models/users/usersDBModel';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { SnackBarComponentExample } from '../../snackbar/snackbar/snack-bar-component-example';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { matchOtherValidator } from '../../../shared/match-other-validator';
import { AuthService } from '../../../core/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  updateTeamForm: FormGroup;
  regFormCompany: FormGroup;
  personalForm: FormGroup;

  user: User;
  company: Company;
  members: User[];
  teams: Team[];
  tickets: Ticket[] = [];

  teamMembers: UsersDBModel;
  suggestedMembers: User[] = [];

  teamLeader: User;

  clicked: number;
  invalidMessage: string;
  regForm: FormGroup;
  role: number = 6;

  privilege: User;

  @ViewChild(SnackBarComponentExample) child: SnackBarComponentExample;

  constructor(
    private jwtService: JwtHelperService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private teamsService: TeamsService,
    private ticketsService: TicketsService,
    private paramsService: ParamsService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/usercontrol.svg'));
    iconRegistry.addSvgIcon(
      'up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/add.svg'));
    iconRegistry.addSvgIcon(
      'cross',
      sanitizer.bypassSecurityTrustResourceUrl('assets/cross.svg'));
    iconRegistry.addSvgIcon(
      'down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/deadd.svg'));
    iconRegistry.addSvgIcon(
      'promo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/promote.svg'));
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/register.svg'));
  }

  ngOnInit() {
    const teamNameRegex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9 _-]{0,39}/);
    const pattern2 = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);

    this.personalForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(pattern2)]),
    });

    this.updateTeamForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(teamNameRegex)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    });

    this.regFormCompany = this.formBuilder.group({
      company: new FormControl('', [Validators.required]),
    });

    const pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);
    this.regForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchOtherValidator('password')
      ]),
    });

    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const userId = +decodedToken.id;

    this.usersService.getById(userId).subscribe(data => {
      this.user = data;
      this.privilege = this.user;

      this.company = data.info.Company;

      this.personalForm.get('firstName').setValue(this.user.info.firstName);
      this.personalForm.get('lastName').setValue(this.user.info.lastName);
      this.personalForm.get('email').setValue(this.user.info.email);


      this.usersService.getAll().subscribe(data => {
        this.members = data.info.filter(member => member.CompanyId === this.company.id);
      });

      this.teamsService.getAll().subscribe(data => {
        this.teams = data.info.filter(teams => teams.CompanyId === this.company.id);

        this.ticketsService.getAll().subscribe(data => {
          this.teams.forEach(team => {

            const tickets = data.info.filter(ticket => ticket.TeamId === team.id);
            this.tickets.push(...tickets);
          })
        })
      });
    });
  }

  addMember(id: number) {
    this.suggestedMembers = [];

    this.teamsService.getAllUsersFromTeam(id).subscribe(data => {
      this.teamMembers = data;

      this.members.forEach(data => {
        const isUserFound = this.teamMembers.info.find(info => info.UserId === data.id);
        if (!isUserFound) {
          this.suggestedMembers.push(data);
        }
      });
    });

    this.openDialog('add', id);
  }

  removeMember(id: number) {
    this.suggestedMembers = [];

    this.teamsService.getAllUsersFromTeam(id).subscribe(data => {
      this.teamMembers = data;

      this.members.forEach(data => {
        const isUserFound = this.teamMembers.info.find(info => info.UserId === data.id);
        if (isUserFound) {
          this.suggestedMembers.push(data);
        }
      });


      this.teamsService.getById(id).subscribe(data => {
        this.teamLeader = data.info.teamLeaderId;
        this.openDialog('remove', id);
      });
    });
  }

  newLead(id: number) {
    this.suggestedMembers = [];

    this.teamsService.getAllUsersFromTeam(id).subscribe(data => {
      this.teamMembers = data;

      this.members.forEach(data => {
        const isUserFound = this.teamMembers.info.find(info => info.UserId === data.id);
        if (isUserFound) {
          this.suggestedMembers.push(data);
        }
      });


      this.teamsService.getById(id).subscribe(data => {
        this.teamLeader = data.info.teamLeaderId;
        this.openDialog('newLead', id);
      });
    });
  }

  changeMember(user: User) {
    this.suggestedMembers = [];
    this.suggestedMembers.push(user);
    this.openDialog('profile');
  }

  openDialog(option: string, id?: number) {
    let chosenOnes;
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '350px',
      data: { forInvites: this.suggestedMembers, opt: option, teamLead: this.teamLeader },
    });


    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      chosenOnes = result;
      if (option === 'add') {
        chosenOnes.forEach(one => {
          this.teamsService.addUserToTeam(one, id)
            .subscribe(
            x => console.log(),
            err => console.log(err)
            );
        })

        if (chosenOnes.length) {
          this.invalidMessage = 'New members joined the team!';
          this.child.message = this.invalidMessage;
          this.child.openSnackBar();
        }
      } else if (option === 'remove') {
        let teamL = false;
        chosenOnes.forEach(one => {
          if (one === this.teamLeader.id) {
            teamL = true;
            this.invalidMessage = 'You are trying to remove a "Team Leader"!Choose a new "Team Leader" first and try again later!';
            this.child.message = this.invalidMessage;
            this.child.openSnackBar();
          }
        })

        if (!teamL) {
          chosenOnes.forEach(one => {
            this.teamsService.userLeaveTeam(one, id)
              .subscribe(
              x => console.log(),
              err => console.log(err)
              );
          })

          if (chosenOnes.length) {
            this.invalidMessage = 'Members were kicked out of the team!';
            this.child.message = this.invalidMessage;
            this.child.openSnackBar();
          }
        }
      } else if (option === 'newLead') {
        let obj;

        chosenOnes.forEach(one => {
          this.teamsService.getById(id)
            .subscribe(
            x => {
              obj = {
                id: x.info.id,
                name: x.info.name,
                description: x.info.description,
                CompanyId: x.info.CompanyId,
                TeamLeaderId: one.id,
              };

              this.teamsService.updateInfo(obj).subscribe(data => {
                this.invalidMessage = 'The Team has a new "Team Leader"!';
                this.child.message = this.invalidMessage;
                this.child.openSnackBar();
              });
            },
            err => console.log(err)
            );
        });
      } else if (option === 'profile') {
        const profile = this.suggestedMembers.pop();

        chosenOnes.forEach(one => {
          const obj = {
            id: profile.id,
            CompanyId: profile.CompanyId,
            email: profile.email,
            emailNew: one.email,
            RoleId: profile.RoleId,
            firstName: one.firstName,
            lastName: one.lastName,
            password: one.password,
          }

          this.updateUser2(obj);

          this.usersService.getById(obj.id).subscribe(data => {
            this.user = data;
            this.company = data.info.Company;

            this.usersService.getAll().subscribe(data => {
              this.members = data.info.filter(member => member.CompanyId === this.company.id);
            });
          })
        })
      }
    });
  }

  removeTeam(id: number) {
    this.suggestedMembers = [];

    this.teamsService.getAllUsersFromTeam(id).subscribe(data => {
      this.teamMembers = data;

      this.members.forEach(data => {
        const isUserFound = this.teamMembers.info.find(info => info.UserId === data.id);
        if (isUserFound) {
          this.suggestedMembers.push(data);
        }
      });

      this.suggestedMembers.forEach(one => {
        this.teamsService.userLeaveTeam(one.id, id)
          .subscribe(
          x => console.log(),
          err => console.log(err)
          );
      })

      this.teamsService.getById(id).subscribe(data => {
        const obj = {
          id: data.info.id,
          name: data.info.name,
          description: data.info.description,
          CompanyId: data.info.CompanyId,
          TeamLeaderId: data.info.TeamLeaderId,
        }

        this.teamsService.removeById(obj).subscribe(result => {
          this.invalidMessage = 'Team removed!';
          this.child.message = this.invalidMessage;
          this.child.openSnackBar();

          const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
          const userId = +decodedToken.id;

          this.usersService.getById(userId).subscribe(data => {
            this.user = data;
            this.company = data.info.Company;

            this.usersService.getAll().subscribe(data => {
              this.members = data.info.filter(member => member.CompanyId === this.company.id);
            });

            this.teamsService.getAll().subscribe(data => {
              this.teams = data.info.filter(teams => teams.CompanyId === this.company.id);

              this.ticketsService.getAll().subscribe(data => {
                this.teams.forEach(team => {
                  const tickets = data.info.filter(ticket => ticket.TeamId === team.id);
                  this.tickets.push(...tickets);
                })
              })
            });
          });


        })
      })
    });
  }

  editTicket(ticket: Ticket) {
    const myId = this.user.info.id;

    const ticketObject = {
      id: ticket.id,
      description: ticket.description,
      LabelId: ticket.LabelId,
      StatusId: ticket.StatusId,
      deadline: ticket.deadline,
      RequesterId: ticket.RequesterId,
      AssigneeId: ticket.AssigneeId,
      TeamId: ticket.TeamId,
      EscalationContactId: myId,
    };

    this.ticketsService.updateInfo(ticketObject).subscribe(data => {
      this.router.navigate(['/tickets', ticket.id])
    })
  }

  isClicked(team: Team) {
    this.updateTeamForm.get('name').setValue(team.name);
    this.updateTeamForm.get('description').setValue(team.description);
    this.clicked = !this.clicked ? team.id : undefined;
  }

  updateTeam(form, team) {
    this.teamsService.getById(team.id).subscribe(data => {
      this.teamLeader = data.info.teamLeaderId;

      const id = team.id;
      const name = this.updateTeamForm.value.name;
      const description = this.updateTeamForm.value.description;
      const CompanyId = this.company.id;
      const TeamLeaderId = this.teamLeader.id;

      const modelObject = {
        id,
        name,
        description,
        TeamLeaderId,
        CompanyId,
      }

      this.teamsService.updateInfo(modelObject).subscribe(data => {
        this.invalidMessage = 'Update done!';
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();

        this.teamsService.getAll().subscribe(data => {
          this.teams = data.info.filter(teams => teams.CompanyId === this.company.id);
        });

      });
    });
  }

  register() {
    const obj = {
      firstName: this.regForm.value.firstName,
      lastName: this.regForm.value.lastName,
      password: this.regForm.value.password,
      confirmPassword: this.regForm.value.confirmPassword,
      email: this.regForm.value.email,
      company: this.company.id,
    }

    this.authService.register(<User>obj, { observe: 'response', responseType: 'json' })
      .subscribe((response: HttpResponse<string>) => {
        this.usersService.getAll().subscribe(data => {
          this.members = data.info.filter(member => member.CompanyId === this.company.id);
        });

        this.invalidMessage = `${this.regForm.get('email').value} registered successfully!`;
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();
      },
      (error: HttpErrorResponse) => {
        this.invalidMessage = `${this.regForm.get('email').value} already registered!`;
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();

        if (error.status === 302) {
          console.log(error);
        }
      });
  }

  updateCompany() {
    this.paramsService.updateCompany(<Company>{ name: this.regFormCompany.get('company').value, id: this.company.id }).subscribe(data => {
      const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
      const userId = +decodedToken.id;

      this.usersService.getById(userId).subscribe(data => {
        this.user = data;
        this.company = data.info.Company;
      });
    })
  }

  demoteUser(user: User) {
    this.paramsService.getAllRoles().subscribe(data => {
      if (user.RoleId < 6 && user.RoleId >= 1) {
        const obj = {
          id: user.id,
          CompanyId: user.CompanyId,
          email: user.email,
          emailNew: user.email,
          RoleId: ++user.RoleId,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
        }

        this.usersService.updateUser(obj).subscribe(data => {
          this.invalidMessage = `${user.firstName} ${user.lastName} was demoted!`;
          this.child.message = this.invalidMessage;
          this.child.openSnackBar();

          const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
          const userId = +decodedToken.id;

          this.usersService.getById(userId).subscribe(data => {
            this.user = data;
            this.company = data.info.Company;

            this.usersService.getAll().subscribe(data => {
              this.members = data.info.filter(member => member.CompanyId === this.company.id);
            });
          })
        })
      }
    })
  }

  promoteUser(user: User) {
    this.paramsService.getAllRoles().subscribe(data => {
      if (user.RoleId <= 6 && user.RoleId > 1) {
        const obj = {
          id: user.id,
          CompanyId: user.CompanyId,
          email: user.email,
          emailNew: user.email,
          RoleId: --user.RoleId,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
        }

        this.usersService.updateUser(obj).subscribe(data => {
          this.invalidMessage = `${user.firstName} ${user.lastName} was promoted!`;
          this.child.message = this.invalidMessage;
          this.child.openSnackBar();


          const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
          const userId = +decodedToken.id;

          this.usersService.getById(userId).subscribe(data => {
            this.user = data;
            this.company = data.info.Company;

            this.usersService.getAll().subscribe(data => {
              this.members = data.info.filter(member => member.CompanyId === this.company.id);
            });
          })
        })
      }
    })
  }

  updateUser2(object: User) {
    const obj = object || {
      id: this.user.info.id,
      CompanyId: this.user.info.CompanyId,
      email: this.user.info.email,
      emailNew: this.personalForm.get('email').value,
      RoleId: this.user.info.RoleId,
      firstName: this.personalForm.get('firstName').value,
      lastName: this.personalForm.get('lastName').value,
      password: this.personalForm.get('password').value,
    }

    this.usersService.updateUser(obj).subscribe(data => {
      this.invalidMessage = `${obj.firstName} ${obj.lastName}'profile was successfully updated!`;
      this.child.message = this.invalidMessage;
      this.child.openSnackBar();

      this.usersService.getById(obj.id).subscribe(data => {
        this.user = data;
        this.company = data.info.Company;

        this.usersService.getAll().subscribe(data => {
          this.members = data.info.filter(member => member.CompanyId === this.company.id);
        });
      })
    })
  }

  removeUser(user: User) {
    this.tickets.forEach(ticket => {
      const obj = {
        TicketId: +ticket.id,
        UserId: +user.id,
      }

      this.ticketsService.desubscribeForTicket(obj).subscribe(data => { });
    });


    const suggestedTeams = [];
    this.teams.forEach(team => {
      this.teamsService.getAllUsersFromTeam(team.id).subscribe(data => {
        this.teamMembers = data;

        this.teamMembers.info.forEach(member => {
          if (member.UserId === user.id) {
            suggestedTeams.push(team);
          }
        })

        suggestedTeams.forEach(team => {
          this.teamLeader = team.teamLeaderId;
          let teamL = false;

          if (user.id === this.teamLeader.id) {
            teamL = true;
            this.invalidMessage = `You are trying to remove a "Team Leader" from '${team.name}'!Choose a new "Team Leader" first and try again later!`;
            this.child.message = this.invalidMessage;
            this.child.openSnackBar();
            return false;
          }

          if (!teamL) {
            this.teamsService.userLeaveTeam(user.id, team.id)
              .subscribe(
              x => console.log(),
              err => console.log(err)
              );
          }
        });
      });

      const obj = {
        id: user.id,
        CompanyId: null,
        email: user.email,
        emailNew: user.email,
        RoleId: user.RoleId,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      }

      this.usersService.updateUser(obj).subscribe(data => { })
    })

    this.invalidMessage = `${user.email} was kicked out of the company!`;
    this.child.message = this.invalidMessage;
    this.child.openSnackBar();

    const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
    const userId = +decodedToken.id;

    this.usersService.getById(userId).subscribe(data => {
      this.user = data;
      this.company = data.info.Company;

      this.usersService.getAll().subscribe(data => {
        this.members = data.info.filter(member => member.CompanyId === this.company.id);
      });

      this.teamsService.getAll().subscribe(data => {
        this.teams = data.info.filter(teams => teams.CompanyId === this.company.id);
      })
    })
  }

  displayErrorMessageName() {
    return this.updateTeamForm.get('name').hasError('required') ? 'Please enter a name' :
      this.updateTeamForm.get('name').hasError('minLength') ? 'Min 2 symbols required' :
        this.updateTeamForm.get('name').hasError('pattern') ? 'Please enter only letters, numbers, - or _' :
          this.updateTeamForm.get('name').hasError('maxLength') ? 'Max 40 symbols allowed' : '';
  }

  displayErrorMessageDescription() {
    return this.updateTeamForm.get('description').hasError('required') ? 'Please enter a description' :
      this.updateTeamForm.get('description').hasError('minLength') ? 'Min 2 symbols required' :
        this.updateTeamForm.get('description').hasError('maxLength') ? 'Max 200 symbols allowed' : '';
  }

  getErrorMessageEmail() {
    return this.regForm.get('email').hasError('required') ? 'You must enter a value' :
      this.regForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageNames() {
    return this.regForm.get('firstName').hasError('required') ? 'You must enter a value' :
      this.regForm.get('firstName').hasError('minLength') ? '' :
        this.regForm.get('firstName').hasError('maxLength') ? 'Max 20 symbols allowed' : 'Min 3 symbols required';
  }

  getErrorMessageNames2() {
    return this.regForm.get('lastName').hasError('required') ? 'You must enter a value' :
      this.regForm.get('lastName').hasError('minLength') ? '' :
        this.regForm.get('lastName').hasError('maxLength') ? 'Max 20 symbols allowed' : 'Min 3 symbols required';
  }

  getErrorMessagePass() {
    return this.regForm.get('password').hasError('required') ? 'You must enter a value' :
      this.regForm.get('password').hasError('pattern') ? `Password must have at least 6 characters
                                                          and contain at least one of each (1-9, a-z, A-Z)` : '';
  }

  getErrorMessagePass2() {
    return this.regForm.get('confirmPassword').hasError('required') ? 'You must enter a value' :
      this.regForm.get('confirmPassword').get('matchOtherValidator') ? '' : 'Passwords must match';
  }

  getErrorMessageCompany() {
    return this.regForm.get('company').hasError('required') ? '' : '';
  }
}
