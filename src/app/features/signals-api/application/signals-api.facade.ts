import { Injectable, computed, effect, linkedSignal, resource, signal } from '@angular/core';

@Injectable()
export class SignalsApiFacade {
  readonly count = signal(0);
  readonly price = signal(120);
  readonly quantity = signal(1);

  readonly query = signal('angular');
  readonly logs = signal<string[]>([]);

  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
  readonly selected = linkedSignal({
    source: this.options,
    computation: (items) => {
      return items[0] ?? 'N/A';
    }
  });

  readonly topic = signal<'signals' | 'computed' | 'effect'>('signals');

  readonly explanation = resource({
    params: () => this.topic(),
    loader: async ({ params }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const content: Record<string, string> = {
        signals: 'signal guarda estado local reactivo y explícito.',
        computed: 'computed deriva datos evitando duplicación de estado.',
        effect: 'effect ejecuta side effects cuando cambian dependencias.'
      };
      return content[params];
    }
  });

  readonly total = computed(() => this.price() * this.quantity());

  constructor() {
    effect(() => {
      const q = this.query();
      this.logs.update((prev) => [`effect ejecutado con: ${q}`, ...prev].slice(0, 4));
    });
  }

  increment(): void {
    this.count.update((v) => v + 1);
  }

  reset(): void {
    this.count.set(0);
  }

  addQty(): void {
    this.quantity.update((v) => v + 1);
  }

  setQuery(value: string): void {
    this.query.set(value);
  }

  shuffleOptions(): void {
    this.options.set(['Svelte', 'Solid', 'Qwik']);
  }

  select(option: string): void {
    this.selected.set(option);
  }

  setTopic(topic: 'signals' | 'computed' | 'effect'): void {
    this.topic.set(topic);
  }
}
