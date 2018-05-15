import { Directive, Input, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[statusColor]'
})
export class StatusColorDirective implements OnInit {
  @Input('statusColor') status: string;

  constructor(private elref: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const el = this.elref.nativeElement;

    if (this.status === 'COMPLETED') {
      this.renderer.setStyle(el, 'color','#bebebe');
    } else if (this.status === 'ALMOST DONE') {
      this.renderer.setStyle(el, 'color','#63467ae8');
    }else if (this.status === 'IN PROGRESS') {
      this.renderer.setStyle(el, 'color','#9fc950');
    }else if (this.status === 'NOT STARTED') {
      this.renderer.setStyle(el, 'color','#c95050');
    }else if (this.status === 'REOPENED') {
      this.renderer.setStyle(el, 'color','#50a3c9');
    }

  }
}
