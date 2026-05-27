import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-zoneless-testing-notes',
  templateUrl: './zoneless-testing-notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonelessTestingNotesComponent {}
