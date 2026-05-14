import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  templateUrl: './signal-demo.component.html'
})
export class SignalDemoComponent {
  readonly count = input.required<number>();
  readonly increment = output<void>();
  readonly reset = output<void>();
}
