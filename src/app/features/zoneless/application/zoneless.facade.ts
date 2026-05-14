import { Injectable, signal } from '@angular/core';

@Injectable()
export class ZonelessFacade {
  readonly seconds = signal(0);
  readonly clicks = signal(0);
  readonly asyncMessage = signal('Pendiente...');

  private intervalId: ReturnType<typeof setInterval> | null = null;

  init(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.seconds.update((value) => value + 1);
      }, 1000);
    }

    Promise.resolve('Promesa resuelta sin Zone.js ✅').then((message) => {
      this.asyncMessage.set(message);
    });
  }

  destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  incrementClicks(): void {
    this.clicks.update((value) => value + 1);
  }
}
