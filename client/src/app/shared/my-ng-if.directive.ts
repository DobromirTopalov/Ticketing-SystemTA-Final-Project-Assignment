import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appMyNgIf]'
})
export class MyNgIfDirective {

  constructor(private templRef: TemplateRef<any>, private vcref: ViewContainerRef) { }
  hasView = false;

  @Input()
  set appMyNgIf(value: number) {
    if (value > 5 && !this.hasView) {
      this.vcref.createEmbeddedView(this.templRef);
      this.hasView = true;
    } else {
      this.vcref.clear();
      this.hasView = false;
    }
  }
}
