import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-effect-demo',
  templateUrl: './effect-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectDemoComponent {
  readonly logs = input.required<string[]>();
  readonly setQuery = output<string>();
}
