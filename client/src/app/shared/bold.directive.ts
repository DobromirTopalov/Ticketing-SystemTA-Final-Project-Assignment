import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('document:click')
  clickDom(): void {
    // const el: HTMLElement = this.elRef.nativeElement;
    // console.log(el.innerHTML);
    // const input = (<HTMLInputElement>document.getElementById("searchInput"));
    // console.log(input.nodeValue);
    // // input.nodeValue
  }
}
