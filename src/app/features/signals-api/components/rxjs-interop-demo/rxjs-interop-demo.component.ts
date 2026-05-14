import { Component, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, delay, distinctUntilChanged, map, of, shareReplay, switchMap } from 'rxjs';

type Product = {
  id: number;
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps';
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Signals Deep Dive', category: 'Frontend' },
  { id: 2, name: 'RxJS Patterns for UI', category: 'Frontend' },
  { id: 3, name: 'Go Services with Hexagonal', category: 'Backend' },
  { id: 4, name: 'Kubernetes Basics', category: 'DevOps' },
  { id: 5, name: 'Testing Strategies Senior', category: 'Frontend' },
  { id: 6, name: 'Node API Hardening', category: 'Backend' },
];

@Component({
  selector: 'app-rxjs-interop-demo',
  templateUrl: './rxjs-interop-demo.component.html',
})
export class RxjsInteropDemoComponent {
  readonly query = signal('');

  readonly query$ = toObservable(this.query).pipe(
    map((value) => value.trim()),
    debounceTime(250),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }), // Ensure the latest value is shared among subscribers
  );

  private readonly results$ = this.query$.pipe(
    switchMap((query) => {
      const normalized = query.toLowerCase();
      const data = PRODUCTS.filter((item) => item.name.toLowerCase().includes(normalized));
      return of(data).pipe(delay(250));
    }),
  );

  readonly results = toSignal(this.results$, { initialValue: PRODUCTS });

  readonly total = computed(() => this.results().length);

  updateQuery(value: string): void {
    this.query.set(value);
  }
}
