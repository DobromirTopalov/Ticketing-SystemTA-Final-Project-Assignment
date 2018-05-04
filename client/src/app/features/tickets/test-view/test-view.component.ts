import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent implements OnInit {
  // rowHeight: string;
  // cols: number;
  rowHeight = '100px';
  cols = 10;
  tiles = [
    { text: 'Description', cols: 6, rows: 2, color: 'lightblue' },
    { text: 'Status', cols: 4, rows: 1, color: 'pink' },
    { text: 'Label', cols: 4, rows: 1, color: 'lightgreen' },
    { text: 'Requester', cols: 5, rows: 1, color: 'lightpink' },
    { text: 'Assignee', cols: 5, rows: 1, color: '#DDBDF1' },
    { text: 'Members', cols: 5, rows: 1, color: '#DDBDF1' },
    { text: 'Participate', cols: 5, rows: 1, color: '#DDBDF1' },
    { text: 'Comments', cols: 10, rows: 1, color: '#DDBDF1' },
  ];
  constructor(media: ObservableMedia) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        // console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.rowHeight = '80px';
          this.cols = 10;
          this.tiles = [
            { text: 'Description', cols: 10, rows: 2, color: 'lightblue' },
            { text: 'Status', cols: 10, rows: 1, color: 'pink' },
            { text: 'Label', cols: 10, rows: 1, color: 'lightgreen' },
            { text: 'Requester', cols: 10, rows: 1, color: 'lightpink' },
            { text: 'Assignee', cols: 10, rows: 1, color: 'red' },
            { text: 'Members', cols: 10, rows: 1, color: 'blue' },
            { text: 'Participate', cols: 10, rows: 1, color: '#DDBDF1' },
            { text: 'Comments', cols: 10, rows: 1, color: 'green' },
          ];
        }
        else if (change.mqAlias == 'sm') {
          this.rowHeight = '100px';
          this.cols = 10;
          this.tiles = [
            { text: 'Description', cols: 10, rows: 2, color: 'lightblue' },
            { text: 'Status', cols: 5, rows: 1, color: 'pink' },
            { text: 'Label', cols: 5, rows: 1, color: 'lightgreen' },
            { text: 'Requester', cols: 5, rows: 1, color: 'lightpink' },
            { text: 'Assignee', cols: 5, rows: 1, color: 'red' },
            { text: 'Members', cols: 5, rows: 1, color: '#DDBDF1' },
            { text: 'Participate', cols: 5, rows: 1, color: 'blue' },
            { text: 'Comments', cols: 10, rows: 1, color: 'green' },
          ];
        }
        else {
          this.rowHeight = '100px';
          this.cols = 10;
          this.tiles = [
            { text: 'Description', cols: 6, rows: 2, color: 'lightblue' },
            { text: 'Status', cols: 4, rows: 1, color: 'pink' },
            { text: 'Label', cols: 4, rows: 1, color: 'lightgreen' },
            { text: 'Requester', cols: 5, rows: 1, color: 'lightpink' },
            { text: 'Assignee', cols: 5, rows: 1, color: 'red' },
            { text: 'Members', cols: 5, rows: 1, color: '#DDBDF1' },
            { text: 'Participate', cols: 5, rows: 1, color: 'green' },
            { text: 'Comments', cols: 10, rows: 1, color: 'yellow' },
          ];
        }
      });
  }

  ngOnInit() {
  }

}
