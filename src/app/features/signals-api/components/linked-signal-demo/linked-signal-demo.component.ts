import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-linked-signal-demo',
  templateUrl: './linked-signal-demo.component.html'
})
export class LinkedSignalDemoComponent {
  readonly options = input.required<string[]>();
  readonly selected = input.required<string>();
  readonly shuffle = output<void>();
  readonly select = output<string>();
}
