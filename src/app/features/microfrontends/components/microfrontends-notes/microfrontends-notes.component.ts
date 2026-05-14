import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-microfrontends-notes',
  templateUrl: './microfrontends-notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicrofrontendsNotesComponent {}
