import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-effect-cleanup-demo',
  templateUrl: './effect-cleanup-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectCleanupDemoComponent {
  readonly enabled = signal(false);
  readonly ticks = signal(0);
  readonly logs = signal<string[]>([]);

  constructor() {
    effect((onCleanup) => {
      if (!this.enabled()) return;

      this.logs.update((prev) => ['effect ON: inicia intervalo', ...prev].slice(0, 5));
      const id = setInterval(() => {
        this.ticks.update((v) => v + 1);
      }, 1000);

      onCleanup(() => {
        clearInterval(id);
        this.logs.update((prev) => ['cleanup: intervalo liberado', ...prev].slice(0, 5));
      });
    });
  }

  toggle(): void {
    this.enabled.update((v) => !v);
  }

  reset(): void {
    this.ticks.set(0);
    this.logs.set([]);
  }
}
