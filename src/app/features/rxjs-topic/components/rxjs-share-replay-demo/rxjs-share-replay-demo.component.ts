import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, defer, delay, map, of, shareReplay } from 'rxjs';

type UserDto = { id: number; name: string; plan: string };

@Component({
  selector: 'app-rxjs-share-replay-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-share-replay-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsShareReplayDemoComponent {
  private readonly callsSubject = new BehaviorSubject(0);
  readonly calls$ = this.callsSubject.asObservable();

  private readonly rawProfile$ = defer(() => {
    this.callsSubject.next(this.callsSubject.value + 1);
    return of({ id: 7, name: 'Carla', plan: 'Pro' } satisfies UserDto).pipe(delay(700));
  });

  readonly uncachedA$ = this.rawProfile$;
  readonly uncachedB$ = this.rawProfile$;

  readonly cachedProfile$: Observable<UserDto> = this.rawProfile$.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly cachedPlanLabel$ = this.cachedProfile$.pipe(map((user) => `Plan activo: ${user.plan}`));

  resetCounter(): void {
    this.callsSubject.next(0);
  }
}
