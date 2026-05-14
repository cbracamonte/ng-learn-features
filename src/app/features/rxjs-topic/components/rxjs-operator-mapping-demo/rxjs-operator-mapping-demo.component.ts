import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, concatMap, delay, mergeMap, of, switchMap, tap } from 'rxjs';

type EventLog = { id: number; text: string };

@Component({
  selector: 'app-rxjs-operator-mapping-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-operator-mapping-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsOperatorMappingDemoComponent {
  private readonly request$ = new Subject<number>();
  private seq = 0;

  private readonly switchLogsSubject = new BehaviorSubject<EventLog[]>([]);
  private readonly concatLogsSubject = new BehaviorSubject<EventLog[]>([]);
  private readonly mergeLogsSubject = new BehaviorSubject<EventLog[]>([]);

  readonly switchLogs$ = this.switchLogsSubject.asObservable();
  readonly concatLogs$ = this.concatLogsSubject.asObservable();
  readonly mergeLogs$ = this.mergeLogsSubject.asObservable();

  constructor() {
    this.request$
      .pipe(
        switchMap((id) =>
          of(id).pipe(
            tap(() => this.push(this.switchLogsSubject, id, 'start')),
            delay(this.ms()),
            tap(() => this.push(this.switchLogsSubject, id, 'done')),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();

    this.request$
      .pipe(
        concatMap((id) =>
          of(id).pipe(
            tap(() => this.push(this.concatLogsSubject, id, 'start')),
            delay(this.ms()),
            tap(() => this.push(this.concatLogsSubject, id, 'done')),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();

    this.request$
      .pipe(
        mergeMap((id) =>
          of(id).pipe(
            tap(() => this.push(this.mergeLogsSubject, id, 'start')),
            delay(this.ms()),
            tap(() => this.push(this.mergeLogsSubject, id, 'done')),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  fireQuickRequests(): void {
    [1, 2, 3].forEach((n, index) => {
      setTimeout(() => this.request$.next(++this.seq * 10 + n), index * 120);
    });
  }

  reset(): void {
    this.switchLogsSubject.next([]);
    this.concatLogsSubject.next([]);
    this.mergeLogsSubject.next([]);
    this.seq = 0;
  }

  private push(target: BehaviorSubject<EventLog[]>, id: number, state: 'start' | 'done'): void {
    const next = [{ id: Date.now() + Math.random(), text: `req ${id}: ${state}` }, ...target.value].slice(0, 8);
    target.next(next);
  }

  private ms(): number {
    return 450 + Math.floor(Math.random() * 550);
  }
}
