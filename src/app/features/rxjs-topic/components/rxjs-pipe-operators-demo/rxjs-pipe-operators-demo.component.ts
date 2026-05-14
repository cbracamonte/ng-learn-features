import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, filter, map, of, startWith, switchMap, tap } from 'rxjs';

type Course = { id: number; title: string };

const COURSES: Course[] = [
  { id: 1, title: 'Angular RxJS desde cero' },
  { id: 2, title: 'Arquitectura Reactiva en Frontend' },
  { id: 3, title: 'Testing Async sin fakeAsync' },
  { id: 4, title: 'Streams y cancelación de requests' },
  { id: 5, title: 'State management con RxJS' },
];

@Component({
  selector: 'app-rxjs-pipe-operators-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-pipe-operators-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsPipeOperatorsDemoComponent {
  private readonly querySubject = new BehaviorSubject('');
  private readonly stageSubject = new BehaviorSubject('Esperando input...');

  readonly stage$ = this.stageSubject.asObservable();

  readonly results$ = this.querySubject.pipe(
    tap((v) => this.stageSubject.next(`raw input: "${v}"`)),
    map((v) => v.trim().toLowerCase()),
    tap((v) => this.stageSubject.next(`map/trim: "${v}"`)),
    filter((v) => v.length >= 2),
    tap((v) => this.stageSubject.next(`filter(len>=2): "${v}"`)),
    debounceTime(300),
    tap((v) => this.stageSubject.next(`debounce(300ms): "${v}"`)),
    distinctUntilChanged(),
    tap((v) => this.stageSubject.next(`distinctUntilChanged: "${v}"`)),
    switchMap((q) => {
      this.stageSubject.next(`switchMap -> fake API con "${q}"`);
      const data = COURSES.filter((c) => c.title.toLowerCase().includes(q));
      return of(data).pipe(delay(260));
    }),
  );

  readonly resultsView$ = this.results$.pipe(startWith([] as Course[]));

  setQuery(value: string): void {
    this.querySubject.next(value);
  }
}
