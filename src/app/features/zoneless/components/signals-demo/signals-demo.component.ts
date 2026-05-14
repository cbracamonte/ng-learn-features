import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-signals-demo',
  templateUrl: './signals-demo.component.html'
})
export class SignalsDemoComponent {
  readonly seconds = input.required<number>();
  readonly clicks = input.required<number>();
  readonly asyncMessage = input.required<string>();
  readonly increment = output<void>();
}
