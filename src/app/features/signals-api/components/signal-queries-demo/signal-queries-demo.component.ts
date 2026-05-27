import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild, viewChildren } from '@angular/core';

type Task = { id: number; title: string };

@Component({
  selector: 'app-signal-queries-demo',
  templateUrl: './signal-queries-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalQueriesDemoComponent {
  readonly showInput = signal(true);
  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Refactor auth guard' },
    { id: 2, title: 'Agregar test de integración' },
    { id: 3, title: 'Documentar API contract' }
  ]);

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly taskRows = viewChildren<ElementRef<HTMLLIElement>>('taskRow');

  readonly inputReady = computed(() => !!this.searchInput());
  readonly rowCount = computed(() => this.taskRows().length);

  toggleInput(): void {
    this.showInput.update((v) => !v);
  }

  focusInput(): void {
    this.searchInput()?.nativeElement.focus();
  }

  addTask(title: string): void {
    const value = title.trim();
    if (!value) return;

    this.tasks.update((prev) => [...prev, { id: Date.now(), title: value }]);
  }

  removeLast(): void {
    this.tasks.update((prev) => prev.slice(0, -1));
  }

  highlightFirst(): void {
    const first = this.taskRows()[0]?.nativeElement;
    if (!first) return;

    first.classList.add('ring-2', 'ring-fuchsia-400');
    setTimeout(() => first.classList.remove('ring-2', 'ring-fuchsia-400'), 700);
  }
}
