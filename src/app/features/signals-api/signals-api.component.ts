import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignalsApiFacade } from './application/signals-api.facade';
import { ComputedDemoComponent } from './components/computed-demo/computed-demo.component';
import { EffectDemoComponent } from './components/effect-demo/effect-demo.component';
import { EffectCleanupDemoComponent } from './components/effect-cleanup-demo/effect-cleanup-demo.component';
import { LinkedSignalDemoComponent } from './components/linked-signal-demo/linked-signal-demo.component';
import { ResourceDemoComponent } from './components/resource-demo/resource-demo.component';
import { ResourceHttpDemoComponent } from './components/resource-http-demo/resource-http-demo.component';
import { RxjsTodoDemoComponent } from './components/rxjs-todo-demo/rxjs-todo-demo.component';
import { RxjsHttpDemoComponent } from './components/rxjs-http-demo/rxjs-http-demo.component';
import { RxjsInteropDemoComponent } from './components/rxjs-interop-demo/rxjs-interop-demo.component';
import { SignalDemoComponent } from './components/signal-demo/signal-demo.component';
import { SignalQueriesDemoComponent } from './components/signal-queries-demo/signal-queries-demo.component';
import { SignalTodoDemoComponent } from './components/signal-todo-demo/signal-todo-demo.component';
import { ToSignalSyncDemoComponent } from './components/to-signal-sync-demo/to-signal-sync-demo.component';
import { UntrackedDemoComponent } from './components/untracked-demo/untracked-demo.component';
import { SignalsNotesComponent } from './components/signals-notes/signals-notes.component';

@Component({
  selector: 'app-signals-api',
  imports: [
    RouterLink,
    SignalDemoComponent,
    ComputedDemoComponent,
    EffectDemoComponent,
    EffectCleanupDemoComponent,
    UntrackedDemoComponent,
    LinkedSignalDemoComponent,
    ResourceDemoComponent,
    ResourceHttpDemoComponent,
    RxjsTodoDemoComponent,
    RxjsHttpDemoComponent,
    RxjsInteropDemoComponent,
    SignalTodoDemoComponent,
    ToSignalSyncDemoComponent,
    SignalQueriesDemoComponent,
    SignalsNotesComponent
  ],
  providers: [SignalsApiFacade],
  templateUrl: './signals-api.component.html'
})
export class SignalsApiComponent {
  protected readonly facade = inject(SignalsApiFacade);
}
