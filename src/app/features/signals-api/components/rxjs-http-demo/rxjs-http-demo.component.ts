import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, catchError, of, startWith, switchMap } from 'rxjs';

type TodoDto = {
  id: number;
  title: string;
  completed: boolean;
};

type RemoteState = {
  loading: boolean;
  error: string | null;
  data: TodoDto[];
};

@Component({
  selector: 'app-rxjs-http-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-http-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsHttpDemoComponent {
  private readonly userIdSubject = new BehaviorSubject(1);
  // Si quieres NO mantener el último dato en pantalla durante loading, puedes emitir un estado vacío en cada request.
  // Ejemplo (descomenta dentro de switchMap):
  //
  // return from(
  //   fetch(`https://jsonplaceholder.typicode.com/todos?_limit=6&userId=${userId}`)
  //     .then((response) => {
  //       if (!response.ok) throw new Error('No se pudo cargar todos');
  //       return response.json() as Promise<TodoDto[]>;
  //     })
  //     .then((data) => ({ loading: false, error: null, data }) as RemoteState),
  // ).pipe(
  //   startWith({ loading: true, error: null, data: [] } as RemoteState),
  // );

  readonly state$ = this.userIdSubject.pipe(
    switchMap((userId) =>
      fetch(`https://jsonplaceholder.typicode.com/todos?_limit=6&userId=${userId}`)
        .then((response) => {
          if (!response.ok) throw new Error('No se pudo cargar todos');
          return response.json() as Promise<TodoDto[]>;
        })
        .then((data) => ({ loading: false, error: null, data }) as RemoteState),
    ),
    startWith({ loading: true, error: null, data: [] } as RemoteState),
    catchError((err: Error) =>
      of({
        loading: false,
        error: err.message,
        data: [],
      } as RemoteState),
    ),
  );

  setUser(userId: number): void {
    this.userIdSubject.next(userId);
  }
}
