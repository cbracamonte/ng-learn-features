import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  SimpleChanges,
  computed,
  input,
  signal,
} from '@angular/core';

type LegacyHook = {
  name: string;
  moment: string;
  useCase: string;
  warning: string;
};

type HookLog = {
  id: number;
  hook: string;
  cycle: string;
  detail: string;
};

const LEGACY_HOOKS: LegacyHook[] = [
  {
    name: 'constructor',
    moment: 'Cuando TypeScript/Angular instancia la clase.',
    useCase: 'Inyección y defaults simples. No dependas todavía de inputs ni del DOM.',
    warning: 'No hagas lógica de inicialización de negocio pesada acá.',
  },
  {
    name: 'ngOnChanges',
    moment: 'Cada vez que cambia un input, antes de ngOnInit en el primer render.',
    useCase: 'Reaccionar a cambios de contrato desde el padre.',
    warning: 'No lo uses para duplicar estado si podés derivarlo con computed().',
  },
  {
    name: 'ngOnInit',
    moment: 'Una sola vez, después de inicializar inputs.',
    useCase: 'Inicialización que depende de inputs iniciales.',
    warning: 'No asumas que la vista del componente ya está lista.',
  },
  {
    name: 'ngDoCheck',
    moment: 'Cada vez que Angular chequea el componente.',
    useCase: 'Casos muy específicos de detección manual.',
    warning: 'Carísimo si metés lógica pesada. Usalo como bisturí, no como martillo.',
  },
  {
    name: 'ngAfterContentInit / Checked',
    moment: 'Después de inicializar o chequear contenido proyectado con ng-content.',
    useCase: 'Integraciones con contenido externo proyectado.',
    warning: 'Cambiar estado acá puede disparar errores de expresión cambiada.',
  },
  {
    name: 'ngAfterViewInit / Checked',
    moment: 'Después de inicializar o chequear la vista propia del componente.',
    useCase: 'Leer queries de vista ya disponibles.',
    warning: 'No manipules DOM por reflejo. Para DOM post-render moderno preferí render callbacks.',
  },
  {
    name: 'ngOnDestroy',
    moment: 'Antes de destruir la instancia.',
    useCase: 'Cleanup de recursos imperativos.',
    warning: 'Si abriste algo, cerralo. Es así de fácil.',
  },
];

@Component({
  selector: 'app-legacy-lifecycles-demo',
  templateUrl: './legacy-lifecycles-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyLifecyclesDemoComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  readonly cycle = input.required<number>();
  readonly hooks = LEGACY_HOOKS;
  readonly logs = signal<HookLog[]>([]);
  readonly totalLogs = computed(() => this.logs().length);

  private nextLogId = 1;
  private readonly recordedCycles = new Map<string, number>();

  constructor() {
    this.recordLifecycle('constructor', 'instancia creada');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cycle = this.readCycleFromChanges(changes) ?? this.cycle();
    this.recordLifecycle('ngOnChanges', `input cycle cambió a ${cycle}`, cycle);
  }

  ngOnInit(): void {
    this.recordLifecycle('ngOnInit', 'inputs iniciales listos');
  }

  ngDoCheck(): void {
    this.recordOncePerCycle('ngDoCheck', 'Angular está chequeando este componente');
  }

  ngAfterContentInit(): void {
    this.recordLifecycle('ngAfterContentInit', 'contenido proyectado inicializado');
  }

  ngAfterContentChecked(): void {
    this.recordOncePerCycle('ngAfterContentChecked', 'contenido proyectado chequeado');
  }

  ngAfterViewInit(): void {
    this.recordLifecycle('ngAfterViewInit', 'vista propia inicializada');
  }

  ngAfterViewChecked(): void {
    this.recordOncePerCycle('ngAfterViewChecked', 'vista propia chequeada');
  }

  ngOnDestroy(): void {
    console.info('[Lifecycle demo] ngOnDestroy: liberar recursos imperativos');
  }

  clearLogs(): void {
    this.logs.set([]);
    this.recordedCycles.clear();
  }

  private recordOncePerCycle(hook: string, detail: string): void {
    const currentCycle = this.cycle();
    if (this.recordedCycles.get(hook) === currentCycle) return;

    this.recordedCycles.set(hook, currentCycle);
    this.recordLifecycle(hook, detail, currentCycle);
  }

  private recordLifecycle(hook: string, detail: string, explicitCycle?: number): void {
    const cycle = explicitCycle ?? this.safeCycle();

    queueMicrotask(() => {
      this.logs.update((current) => [
        {
          id: this.nextLogId++,
          hook,
          cycle: cycle === null ? 'antes de input' : `input ${cycle}`,
          detail,
        },
        ...current,
      ].slice(0, 10));
    });
  }

  private safeCycle(): number | null {
    try {
      return this.cycle();
    } catch {
      return null;
    }
  }

  private readCycleFromChanges(changes: SimpleChanges): number | null {
    const currentValue = changes['cycle']?.currentValue;
    return typeof currentValue === 'number' ? currentValue : null;
  }
}
