import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-deferred-content-demo',
  templateUrl: './deferred-content-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block rounded-xl border border-emerald-200 bg-emerald-50 p-4'
  }
})
export class DeferredContentDemoComponent {
  readonly title = input.required<string>();
  readonly detail = input.required<string>();
  readonly fail = input(false);

  protected readonly status = computed(() => {
    if (this.fail()) {
      throw new Error('Fallo intencional para demostrar @error en @defer');
    }

    return 'contenido cargado';
  });
}
