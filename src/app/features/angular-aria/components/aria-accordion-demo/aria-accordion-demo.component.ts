import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';

@Component({
  selector: 'app-aria-accordion-demo',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent],
  templateUrl: './aria-accordion-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaAccordionDemoComponent {
  readonly multiExpandable = signal(false);

  toggleMultiExpandable(): void {
    this.multiExpandable.update((value) => !value);
  }
}
