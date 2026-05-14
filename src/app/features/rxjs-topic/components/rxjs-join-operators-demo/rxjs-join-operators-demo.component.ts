import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, forkJoin, interval, map, of, take } from 'rxjs';

type JoinLog = { id: number; text: string };

@Component({
  selector: 'app-rxjs-join-operators-demo',
  imports: [AsyncPipe],
  templateUrl: './rxjs-join-operators-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsJoinOperatorsDemoComponent {
  private readonly forkJoinLogsSubject = new BehaviorSubject<JoinLog[]>([]);
  private readonly combineLatestLogsSubject = new BehaviorSubject<JoinLog[]>([]);

  readonly forkJoinLogs$ = this.forkJoinLogsSubject.asObservable();
  readonly combineLatestLogs$ = this.combineLatestLogsSubject.asObservable();

  runForkJoinDemo(): void {
    this.forkJoinLogsSubject.next([]);

    const profile$ = of('Perfil listo').pipe(delay(600));
    const permissions$ = of('Permisos listos').pipe(delay(1200));

    forkJoin([profile$, permissions$]).subscribe(([p, perm]) => {
      this.push(this.forkJoinLogsSubject, `emit único: ${p} + ${perm}`);
      this.push(this.forkJoinLogsSubject, 'ideal para cargar página inicial completa');
    });
  }

  runCombineLatestDemo(): void {
    this.combineLatestLogsSubject.next([]);

    const price$ = interval(500).pipe(
      take(4),
      map((i) => 100 + i * 5),
    );
    const discount$ = interval(800).pipe(
      take(3),
      map((i) => i * 10),
    );

    combineLatest([price$, discount$]).subscribe(([price, discount]) => {
      this.push(this.combineLatestLogsSubject, `recalc: price=${price}, discount=${discount}%`);
    });
  }

  private push(target: BehaviorSubject<JoinLog[]>, text: string): void {
    const next = [{ id: Date.now() + Math.random(), text }, ...target.value].slice(0, 8);
    target.next(next);
  }
}
