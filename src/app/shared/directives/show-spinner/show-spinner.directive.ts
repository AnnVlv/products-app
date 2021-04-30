import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {SpinnerComponent} from '../../components/spinner/spinner.component';


@Directive({
  selector: '[appShowSpinner]'
})
export class ShowSpinnerDirective {
  @ViewChild(SpinnerComponent, { read: ViewContainerRef }) spinnerComponent;
  loadingFactory: ComponentFactory<SpinnerComponent>;
  loadingComponent: ComponentRef<SpinnerComponent>;

  constructor(
    private templateRef: TemplateRef<SpinnerComponent>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

  @Input() set appShowSpinner(isShowSpinner: boolean) {
    this.viewContainerRef.clear();
    if (isShowSpinner) {
      this.loadingComponent = this.viewContainerRef.createComponent(this.loadingFactory);
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
