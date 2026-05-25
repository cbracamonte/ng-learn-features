import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RootCounterService } from '../../application/root-counter.service';

@Component({
  selector: 'app-root-singleton-demo',
  templateUrl: './root-singleton-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootSingletonDemoComponent {
  protected readonly counter = inject(RootCounterService);
}
