import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commentary-post',
  templateUrl: './commentary-post.component.html',
  styleUrls: ['./commentary-post.component.css']
})
export class CommentaryPostComponent implements OnInit {
  @Input()
  comment: any;

  constructor() { }

  ngOnInit() {
  }

}
