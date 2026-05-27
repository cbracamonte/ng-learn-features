import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZonelessFacade } from './application/zoneless.facade';
import { LegacyNoSignalsDemoComponent } from './components/legacy-no-signals-demo/legacy-no-signals-demo.component';
import { LegacyWithCdrDemoComponent } from './components/legacy-with-cdr-demo/legacy-with-cdr-demo.component';
import { SignalsDemoComponent } from './components/signals-demo/signals-demo.component';
import { ZonejsMonkeyPatchingNoteComponent } from './components/zonejs-monkey-patching-note/zonejs-monkey-patching-note.component';
import { ZonelessActivationNoteComponent } from './components/zoneless-activation-note/zoneless-activation-note.component';
import { ZonelessFoundationsNoteComponent } from './components/zoneless-foundations-note/zoneless-foundations-note.component';
import { ZonelessTestingNotesComponent } from './components/zoneless-testing-notes/zoneless-testing-notes.component';

@Component({
  selector: 'app-zoneless',
  imports: [
    RouterLink,
    SignalsDemoComponent,
    LegacyNoSignalsDemoComponent,
    LegacyWithCdrDemoComponent,
    ZonejsMonkeyPatchingNoteComponent,
    ZonelessActivationNoteComponent,
    ZonelessFoundationsNoteComponent,
    ZonelessTestingNotesComponent,
  ],
  providers: [ZonelessFacade],
  templateUrl: './zoneless.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonelessComponent implements OnInit, OnDestroy {
  protected readonly facade = inject(ZonelessFacade);

  ngOnInit(): void {
    this.facade.init();
  }

  ngOnDestroy(): void {
    this.facade.destroy();
  }
}
