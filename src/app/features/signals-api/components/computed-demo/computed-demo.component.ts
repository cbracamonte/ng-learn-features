import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-computed-demo',
  templateUrl: './computed-demo.component.html'
})
export class ComputedDemoComponent {
  readonly price = input.required<number>();
  readonly quantity = input.required<number>();
  readonly total = input.required<number>();
  readonly addQty = output<void>();
}
