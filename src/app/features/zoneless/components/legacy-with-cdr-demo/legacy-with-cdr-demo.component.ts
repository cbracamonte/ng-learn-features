import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  selector: 'app-legacy-with-cdr-demo',
  templateUrl: './legacy-with-cdr-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegacyWithCdrDemoComponent {
  protected legacyWithMarkForCheck = 0;
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {}

  protected runLegacyAsyncWithMarkForCheck(): void {
    this.legacyWithMarkForCheck = 0;

    setTimeout(() => {
      this.legacyWithMarkForCheck = 1;
      this.cdr.markForCheck();
    }, 800);
  }
}
