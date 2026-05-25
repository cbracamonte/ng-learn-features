import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LegacyLifecyclesDemoComponent } from './components/legacy-lifecycles-demo/legacy-lifecycles-demo.component';
import { NewLifecyclesDemoComponent } from './components/new-lifecycles-demo/new-lifecycles-demo.component';

@Component({
  selector: 'app-lifecycle-hooks',
  imports: [RouterLink, LegacyLifecyclesDemoComponent, NewLifecyclesDemoComponent],
  templateUrl: './lifecycle-hooks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleHooksComponent {
  readonly legacyCycle = signal(1);
  readonly showLegacyDemo = signal(true);

  readonly legacyStatus = computed(() =>
    this.showLegacyDemo() ? 'componente montado' : 'componente destruido',
  );

  runLegacyUpdate(): void {
    this.legacyCycle.update((value) => value + 1);
  }

  toggleLegacyDemo(): void {
    this.showLegacyDemo.update((value) => !value);
  }
}
