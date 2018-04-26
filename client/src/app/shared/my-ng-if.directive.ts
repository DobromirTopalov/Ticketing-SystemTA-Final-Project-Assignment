import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appMyNgIf]'
})
export class MyNgIfDirective {

  constructor(private templeteRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }
  hasView = false;

  @Input()
  set appMyNgIf(value: number) {
    if(value > 0 && !this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templeteRef);
      this.hasView = true;
    } else if(value === 0 && this.hasView){
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }
}
