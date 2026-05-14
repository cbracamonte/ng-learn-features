import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FederationComparisonComponent } from './components/federation-comparison/federation-comparison.component';
import { MicrofrontendsNotesComponent } from './components/microfrontends-notes/microfrontends-notes.component';

@Component({
  selector: 'app-microfrontends',
  imports: [RouterLink, FederationComparisonComponent, MicrofrontendsNotesComponent],
  templateUrl: './microfrontends.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicrofrontendsComponent {}
