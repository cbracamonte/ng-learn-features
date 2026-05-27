import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataArchitectureNotesComponent } from './components/data-architecture-notes/data-architecture-notes.component';
import { DataFetchingFoundationsComponent } from './components/data-fetching-foundations/data-fetching-foundations.component';
import { DataInterviewChecklistComponent } from './components/data-interview-checklist/data-interview-checklist.component';
import { DataStateConcurrencyComponent } from './components/data-state-concurrency/data-state-concurrency.component';

@Component({
  selector: 'app-frontend-data-flow',
  imports: [
    RouterLink,
    DataFetchingFoundationsComponent,
    DataArchitectureNotesComponent,
    DataStateConcurrencyComponent,
    DataInterviewChecklistComponent
  ],
  templateUrl: './frontend-data-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontendDataFlowComponent {}
