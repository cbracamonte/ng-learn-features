import { Component, linkedSignal, resource, signal } from '@angular/core';

type TodoDto = {
  id: number;
  title: string;
  completed: boolean;
};

@Component({
  selector: 'app-resource-http-demo',
  templateUrl: './resource-http-demo.component.html'
})
export class ResourceHttpDemoComponent {
  readonly userId = signal(1);

  readonly todosResource = resource({
    params: () => this.userId(),
    loader: async ({ params, abortSignal }) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=6&userId=${params}`, {
        // cache: 'force-cache', // Puede mejorar percepción en red rápida, pero NO evita el loading gap en red lenta.
        signal: abortSignal
      });

      if (!response.ok) {
        throw new Error('No se pudo cargar todos');
      }

      return (await response.json()) as TodoDto[];
    }
  });

  // Un signal derivado para extraer solo los todos visibles, evitando que el template tenga que lidiar con el caso de null.
  readonly visibleTodos = linkedSignal({
    source: () => this.todosResource.value(),
    computation: (current, previous): TodoDto[] => current ?? previous?.value ?? []
  }); 

  setUser(userId: number): void {
    this.userId.set(userId);
  }
}
