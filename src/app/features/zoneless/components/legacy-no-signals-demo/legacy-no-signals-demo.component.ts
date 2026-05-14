import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-legacy-no-signals-demo',
  templateUrl: './legacy-no-signals-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegacyNoSignalsDemoComponent {
  protected legacyCounter = 0;

  protected runLegacyAsyncWithoutNotification(): void {
    this.legacyCounter = 0;

    setTimeout(() => {
      this.legacyCounter = 1;
      // Sin signals y sin notificación manual de CD.
      // En zoneless no garantiza actualización visual.
    }, 800);
  }
}
