import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAttribute]'
})
export class AttributeDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
