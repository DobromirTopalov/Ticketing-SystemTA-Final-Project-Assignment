import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  in(): void {
    const el: HTMLElement = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'font-weight', 'bold');
  }

  @HostListener('document:click')
  clickDom(): void {
    const el: HTMLElement = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'font-weight', 'bold');
  }

  @HostListener('mouseleave')
  out(): void {
    const el: HTMLElement = this.elRef.nativeElement;
    this.renderer.removeStyle(el, 'font-weight');
  }



}
