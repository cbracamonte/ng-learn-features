import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

@Component({
  selector: 'app-rxjs-todo-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-todo-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsTodoDemoComponent {
  private readonly todosSubject = new BehaviorSubject<Todo[]>([]);
  private readonly filterSubject = new BehaviorSubject<'all' | 'pending' | 'done'>('all');
  private nextId = 1;

  readonly todos$ = this.todosSubject.asObservable();
  readonly filter$ = this.filterSubject.asObservable();

  readonly visibleTodos$ = combineLatest([this.todos$, this.filter$]).pipe(
    map(([todos, filter]) => {
      if (filter === 'pending') return todos.filter((todo) => !todo.done);
      if (filter === 'done') return todos.filter((todo) => todo.done);
      return todos;
    })
  );

  readonly stats$ = this.todos$.pipe(
    map((todos) => ({
      total: todos.length,
      done: todos.filter((todo) => todo.done).length
    }))
  );

  addTodo(rawText: string): void {
    const text = rawText.trim();
    if (!text) return;

    const nextTodo: Todo = {
      id: this.nextId++,
      text,
      done: false
    };

    this.todosSubject.next([...this.todosSubject.value, nextTodo]);
  }

  toggleTodo(id: number): void {
    const next = this.todosSubject.value.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    this.todosSubject.next(next);
  }

  setFilter(filter: 'all' | 'pending' | 'done'): void {
    this.filterSubject.next(filter);
  }
}
