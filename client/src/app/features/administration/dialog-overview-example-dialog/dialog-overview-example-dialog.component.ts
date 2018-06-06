import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../models/users/user';
import { FormGroup } from '@angular/forms/src/model';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { SnackBarComponentExample } from '../../snackbar/snackbar/snack-bar-component-example';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialogComponent implements OnInit {
  @Input()
  selectedItems: any = [];
  favoritePersons: User;
  personalForm: FormGroup;

  invalidMessage: string;
  @ViewChild(SnackBarComponentExample) child: SnackBarComponentExample;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.favoritePersons = this.data.teamLead;
    const pattern2 = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/);

    this.personalForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(pattern2)]),
    });

    if (this.data.opt === 'profile') {
      this.personalForm.get('firstName').setValue(this.data.forInvites[0].firstName);
      this.personalForm.get('lastName').setValue(this.data.forInvites[0].lastName);
      this.personalForm.get('email').setValue(this.data.forInvites[0].email);
    }

    if (this.data.opt === 'newLead') {
      this.selectedItems.push(this.data.teamLead);
    }

    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(result => {
      if (!this.updateInfo() && this.data.opt === 'profile') {
        this.invalidMessage = 'Fill all the fields before leaving!';
        this.child.message = this.invalidMessage;
        this.child.openSnackBar();
        return false;
      };
      this.dialogRef.close(this.selectedItems);
    });

  }

  // onNoClick(): void {
  //   console.log('cls');
  //   this.dialogRef.close(this.selectedItems);
  // }

  isLead(person: number) {
    return (+person === +this.data.teamLead.id);
  }

  onAreaListControlChanged(list) {
    this.selectedItems = list.selectedOptions.selected.map(item => item.value);
  }

  sel(person) {
    this.selectedItems = [];
    this.selectedItems.push(person);
  }

  updateInfo() {
    if (this.data.opt === 'profile' && this.personalForm.valid) {
      this.selectedItems.push(this.personalForm.value);
      return true;
    }
    return false;
  }

  getErrorMessageNames() {
    return this.personalForm.get('firstName').hasError('required') ? 'You must enter a value' :
      this.personalForm.get('firstName').hasError('minLength') ? '' :
        this.personalForm.get('firstName').hasError('maxLength') ? 'Max 20 symbols allowed' : 'Min 3 symbols required';
  }

  getErrorMessageNames2() {
    return this.personalForm.get('lastName').hasError('required') ? 'You must enter a value' :
      this.personalForm.get('lastName').hasError('minLength') ? '' :
        this.personalForm.get('lastName').hasError('maxLength') ? 'Max 20 symbols allowed' : 'Min 3 symbols required';
  }

  getErrorMessagePass() {
    return this.personalForm.get('password').hasError('required') ? 'You must enter a value' :
      this.personalForm.get('password').hasError('pattern') ? `Password must have at least 6 characters
                                                          and contain at least one of each (1-9, a-z, A-Z)` : '';
  }

}
