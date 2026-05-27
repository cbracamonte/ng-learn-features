import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

@Component({
  selector: 'app-signal-todo-demo',
  templateUrl: './signal-todo-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalTodoDemoComponent {
  private nextId = 1;

  readonly todos = signal<Todo[]>([]);
  readonly filter = signal<'all' | 'pending' | 'done'>('all');

  readonly visibleTodos = computed(() => {
    const items = this.todos();
    const currentFilter = this.filter();

    if (currentFilter === 'pending') return items.filter((todo) => !todo.done);
    if (currentFilter === 'done') return items.filter((todo) => todo.done);
    return items;
  });

  readonly total = computed(() => this.todos().length);
  readonly doneCount = computed(() => this.todos().filter((todo) => todo.done).length);

  addTodo(rawText: string): void {
    const text = rawText.trim();
    if (!text) return;

    this.todos.update((prev) => [
      ...prev,
      {
        id: this.nextId++,
        text,
        done: false
      }
    ]);
  }

  toggleTodo(id: number): void {
    this.todos.update((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  setFilter(filter: 'all' | 'pending' | 'done'): void {
    this.filter.set(filter);
  }
}
