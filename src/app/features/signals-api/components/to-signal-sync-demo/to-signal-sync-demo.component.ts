import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, map } from 'rxjs';

@Component({
  selector: 'app-to-signal-sync-demo',
  templateUrl: './to-signal-sync-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToSignalSyncDemoComponent {
  private readonly syncSource$ = new BehaviorSubject(100);
  private readonly asyncSource$ = interval(1000).pipe(map((v) => v + 1));

  readonly syncValue = toSignal(this.syncSource$, { requireSync: true });
  readonly asyncValue = toSignal(this.asyncSource$, { initialValue: 0 });

  incrementSync(): void {
    this.syncSource$.next(this.syncSource$.value + 10);
  }
}
