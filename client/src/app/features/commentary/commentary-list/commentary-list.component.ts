import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.css']
})
export class CommentaryListComponent implements OnInit {

  @Input()
  commentsList: any;
  constructor() { }

  ngOnInit() {
  }

  showComments(ev){
    console.log(ev,'inside listcomments');
  }
}
