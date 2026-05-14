import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';

type TodoDto = {
  id: number;
  title: string;
  completed: boolean;
};

@Component({
  selector: 'app-http-resource-demo',
  templateUrl: './http-resource-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourceDemoComponent {
  readonly todoId = signal(1);

  readonly todo = httpResource<TodoDto>(
    () => `https://jsonplaceholder.typicode.com/todos/${this.todoId()}`,
    {
      defaultValue: { id: 0, title: 'Cargando...', completed: false },
      parse: (value: unknown) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          'id' in value &&
          'title' in value &&
          'completed' in value
        ) {
          const dto = value as TodoDto;
          return dto;
        }

        throw new Error('Respuesta inesperada del backend');
      },
    },
  );

  setTodo(id: number): void {
    this.todoId.set(id);
  }

  reload(): void {
    this.todo.reload();
  }
}
