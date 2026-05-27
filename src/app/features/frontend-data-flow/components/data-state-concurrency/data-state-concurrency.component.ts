import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-data-state-concurrency',
  imports: [],
  templateUrl: './data-state-concurrency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataStateConcurrencyComponent {}
