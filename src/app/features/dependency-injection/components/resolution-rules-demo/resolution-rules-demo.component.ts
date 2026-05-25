import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DI_ANIMAL, DI_FLOWER } from '../../application/di.tokens';

@Component({
  selector: 'app-di-inspector',
  template: `
    <article class="rounded-lg border border-amber-200 bg-white p-3">
      <h3 class="text-sm font-semibold text-slate-900">{{ source() }}</h3>
      <dl class="mt-2 space-y-1 text-xs text-slate-700">
        <div class="flex justify-between gap-3">
          <dt class="font-medium">DI_FLOWER</dt>
          <dd>{{ flower }}</dd>
        </div>
        <div class="flex justify-between gap-3">
          <dt class="font-medium">DI_ANIMAL</dt>
          <dd>{{ animal }}</dd>
        </div>
      </dl>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiInspectorComponent {
  readonly source = input.required<string>();
  protected readonly flower = inject(DI_FLOWER);
  protected readonly animal = inject(DI_ANIMAL);
}

@Component({
  selector: 'app-di-boundary',
  imports: [DiInspectorComponent],
  providers: [{ provide: DI_FLOWER, useValue: '🌻 component providers' }],
  viewProviders: [{ provide: DI_ANIMAL, useValue: '🐶 component viewProviders' }],
  template: `
    <section class="rounded-lg border border-amber-300 bg-amber-100 p-3">
      <h3 class="text-sm font-semibold text-slate-900">Componente boundary</h3>
      <p class="mt-1 text-xs text-amber-950">
        <code>providers</code> cruza hacia contenido proyectado. <code>viewProviders</code> queda limitado a la vista propia.
      </p>

      <div class="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <p class="mb-2 text-xs font-semibold text-amber-950">Contenido proyectado</p>
          <ng-content />
        </div>
        <div>
          <p class="mb-2 text-xs font-semibold text-amber-950">Vista interna</p>
          <app-di-inspector source="Inspector dentro de la vista" />
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiBoundaryComponent {}

@Component({
  selector: 'app-resolution-rules-demo',
  imports: [DiBoundaryComponent, DiInspectorComponent],
  templateUrl: './resolution-rules-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResolutionRulesDemoComponent {}
