import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appRedStyle]'
})
export class RedStyleDirective {
  el: HTMLElement;

  constructor(private elref: ElementRef, private renderer: Renderer2) { 
    this.el = this.elref.nativeElement;
    this.renderer.setStyle(this.el, 'color','cyan')
    // this.el.style.backgroundColor = 'red';
  }

  @HostListener('mouseenter')
  inside(): void {
    const el: HTMLElement = this.elref.nativeElement;
    this.renderer.setStyle(el, 'font-weight', 'bold');
  }

  @HostListener('mouseleave')
  outside(): void {
    const el: HTMLElement = this.elref.nativeElement;
    this.renderer.removeStyle(el, 'font-weight');
  }

  @HostListener('document: click')
  clickDom(): void {
    const el: HTMLElement = this.elref.nativeElement;
    this.renderer.setStyle(el, 'font-weight', 'bold');
    if(el.style.color === 'cyan')
    {
      this.renderer.setStyle(el, 'color', 'salmon');
    } else {
      this.renderer.setStyle(el, 'color', 'cyan');
    }
  }
}
