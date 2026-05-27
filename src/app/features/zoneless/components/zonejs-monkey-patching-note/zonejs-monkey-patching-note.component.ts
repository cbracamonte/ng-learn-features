import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-zonejs-monkey-patching-note',
  templateUrl: './zonejs-monkey-patching-note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonejsMonkeyPatchingNoteComponent {}
