import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rxjs-notes',
  templateUrl: './rxjs-notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsNotesComponent {}
