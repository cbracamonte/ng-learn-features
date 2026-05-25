import { Injectable, signal } from '@angular/core';

@Injectable()
export class DiSessionService {
  private static nextInstance = 1;

  readonly instanceId = DiSessionService.nextInstance++;
  readonly actions = signal<string[]>(['session creada']);

  addAction(label: string): void {
    this.actions.update((current) => [`${label} · evento ${current.length + 1}`, ...current].slice(0, 5));
  }

  reset(): void {
    this.actions.set(['session reiniciada']);
  }
}
