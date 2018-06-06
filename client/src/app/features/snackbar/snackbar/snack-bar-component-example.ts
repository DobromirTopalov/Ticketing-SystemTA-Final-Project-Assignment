import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Input } from '@angular/core';

/**
 * @title Basic snack-bar
 */
@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar-component-example.html',
  styleUrls: ['snack-bar-component-example.css'],
})
export class SnackBarComponentExample {
  @Input()
  message: string;

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar() {
    this.snackBar.open(this.message,'',{
      duration: 2500,
    });
  }
}
