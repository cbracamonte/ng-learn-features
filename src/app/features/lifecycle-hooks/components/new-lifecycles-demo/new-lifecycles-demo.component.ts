import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterEveryRender,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  signal,
  untracked,
} from '@angular/core';

type RenderApi = {
  name: string;
  kind: string;
  useCase: string;
  warning: string;
};

type RenderLog = {
  id: number;
  message: string;
};

const RENDER_APIS: RenderApi[] = [
  {
    name: 'afterNextRender',
    kind: 'callback one-shot',
    useCase: 'Correr una vez después del próximo render completo de la app. Ideal para medir o enfocar algo al montar.',
    warning: 'No corre en SSR ni pre-render. Requiere injection context o pasar injector en AfterRenderOptions.',
  },
  {
    name: 'afterEveryRender',
    kind: 'callback recurrente',
    useCase: 'Correr después de cada render completo. Sirve para integrar DOM imperativo sin engancharte a hooks de vista.',
    warning: 'No actualices signals sin control acá: podés crear loops de render. DOM imperativo, con cuidado.',
  },
  {
    name: 'afterRenderEffect',
    kind: 'effect post-render',
    useCase: 'Reaccionar a signals, pero ejecutar el side effect cuando Angular terminó de renderizar.',
    warning: 'Preferí fases explícitas. El callback simple cae en mixedReadWrite y puede degradar performance.',
  },
  {
    name: 'AfterRenderOptions',
    kind: 'configuración',
    useCase: 'Permite pasar injector o pedir cleanup manual con manualCleanup.',
    warning: 'No es un hook. Es el contrato de opciones para crear callbacks/effects de render.',
  },
];

@Component({
  selector: 'app-new-lifecycles-demo',
  templateUrl: './new-lifecycles-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewLifecyclesDemoComponent {
  readonly renderApis = RENDER_APIS;
  readonly padding = signal(16);
  readonly renderLogs = signal<RenderLog[]>([]);
  readonly paddingLabel = computed(() => `${this.padding()}px`);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private nextLogId = 1;

  constructor() {
    afterNextRender(
      {
        write: () => {
          const box = this.getRenderBox();
          if (!box) return false;

          box.style.borderColor = 'rgb(124 58 237)';
          box.style.padding = this.paddingLabel();
          return true;
        },
        read: (didWrite) => {
          const box = this.getRenderBox();
          if (!didWrite || !box) return;

          this.addRenderLog(`afterNextRender leyó altura inicial: ${Math.round(box.getBoundingClientRect().height)}px`);
        },
      },
      { injector: this.injector },
    );

    afterEveryRender(() => {
      const marker = this.host.nativeElement.querySelector<HTMLElement>('[data-every-render-marker]');
      if (!marker) return;

      marker.textContent = `afterEveryRender corrió después del último render: ${new Date().toLocaleTimeString()}`;
    });

    afterRenderEffect(
      {
        write: (onCleanup) => {
          const box = this.getRenderBox();
          const nextPadding = this.padding();

          if (box) {
            box.style.padding = `${nextPadding}px`;
            box.style.backgroundColor = nextPadding >= 32 ? 'rgb(237 233 254)' : 'rgb(250 245 255)';
          }

          onCleanup(() => {
            this.setMeasurementText('cleanup del render effect anterior ejecutado');
          });

          return nextPadding;
        },
        read: (appliedPadding) => {
          const box = this.getRenderBox();
          if (!box) return;

          const height = Math.round(box.getBoundingClientRect().height);
          this.setMeasurementText(`padding aplicado: ${appliedPadding()}px · altura medida: ${height}px`);
          this.addRenderLog(`afterRenderEffect reaccionó a padding ${appliedPadding()}px y midió ${height}px`);
        },
      },
      { injector: this.injector },
    );
  }

  increasePadding(): void {
    this.padding.update((value) => Math.min(value + 8, 48));
  }

  decreasePadding(): void {
    this.padding.update((value) => Math.max(value - 8, 8));
  }

  resetLogs(): void {
    this.renderLogs.set([]);
  }

  private getRenderBox(): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('[data-render-box]');
  }

  private setMeasurementText(value: string): void {
    const measurement = this.host.nativeElement.querySelector<HTMLElement>('[data-measurement]');
    if (measurement) {
      measurement.textContent = value;
    }
  }

  private addRenderLog(message: string): void {
    untracked(() => {
      this.renderLogs.update((current) => [
        {
          id: this.nextLogId++,
          message,
        },
        ...current,
      ].slice(0, 8));
    });
  }
}
