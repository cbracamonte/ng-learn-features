import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RootCounterService {
  private static nextInstance = 1;

  readonly instanceId = RootCounterService.nextInstance++;
  readonly count = signal(0);
  readonly label = computed(() => `RootCounterService #${this.instanceId} · count ${this.count()}`);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
