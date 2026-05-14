import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, delay, exhaustMap, of, tap } from 'rxjs';

type SubmitLog = { id: number; text: string };

@Component({
  selector: 'app-rxjs-exhaust-map-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-exhaust-map-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsExhaustMapDemoComponent {
  private readonly submitSubject = new Subject<number>();
  private readonly logsSubject = new BehaviorSubject<SubmitLog[]>([]);
  private readonly statusSubject = new BehaviorSubject<'idle' | 'submitting'>('idle');
  private sequence = 0;

  readonly logs$ = this.logsSubject.asObservable();
  readonly status$ = this.statusSubject.asObservable();

  constructor() {
    this.submitSubject
      .pipe(
        takeUntilDestroyed(),
        tap((id) => this.push(`click ${id}: recibido`)),
        exhaustMap((id) => {
          this.statusSubject.next('submitting');
          this.push(`request ${id}: start`);
          return of(id).pipe(
            delay(1000),
            tap(() => {
              this.push(`request ${id}: done`);
              this.statusSubject.next('idle');
            }),
          );
        }),
      )
      .subscribe();
  }

  spamSubmit(): void {
    [1, 2, 3].forEach((_, index) => {
      setTimeout(() => this.submitSubject.next(++this.sequence), index * 150);
    });
  }

  reset(): void {
    this.logsSubject.next([]);
    this.statusSubject.next('idle');
    this.sequence = 0;
  }

  private push(text: string): void {
    const next = [{ id: Date.now() + Math.random(), text }, ...this.logsSubject.value].slice(0, 10);
    this.logsSubject.next(next);
  }
}
