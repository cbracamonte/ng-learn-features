import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DiSessionService } from '../../application/di-session.service';

@Component({
  selector: 'app-di-session-card',
  providers: [DiSessionService],
  template: `
    <article class="rounded-lg border border-sky-200 bg-white p-3">
      <h3 class="text-sm font-semibold text-slate-900">{{ label() }}</h3>
      <p class="mt-1 text-xs text-slate-600">DiSessionService #{{ session.instanceId }}</p>

      <div class="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-lg bg-sky-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          (click)="session.addAction(label())"
        >
          Agregar evento
        </button>
        <button
          type="button"
          class="rounded-lg border border-sky-300 bg-white px-3 py-1.5 text-xs font-medium text-sky-900 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          (click)="session.reset()"
        >
          Reset
        </button>
      </div>

      <ul class="mt-3 space-y-1 text-xs text-slate-700" aria-live="polite">
        @for (action of session.actions(); track action) {
          <li>• {{ action }}</li>
        }
      </ul>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiSessionCardComponent {
  readonly label = input.required<string>();

  protected readonly session = inject(DiSessionService);
}

@Component({
  selector: 'app-component-scope-demo',
  imports: [DiSessionCardComponent],
  templateUrl: './component-scope-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentScopeDemoComponent {}
