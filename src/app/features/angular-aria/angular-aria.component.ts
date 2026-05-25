import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AriaAccordionDemoComponent } from './components/aria-accordion-demo/aria-accordion-demo.component';
import { AriaTabsDemoComponent } from './components/aria-tabs-demo/aria-tabs-demo.component';

@Component({
  selector: 'app-angular-aria',
  imports: [RouterLink, AriaAccordionDemoComponent, AriaTabsDemoComponent],
  templateUrl: './angular-aria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularAriaComponent {}
