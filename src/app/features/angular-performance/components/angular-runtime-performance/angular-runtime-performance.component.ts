import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-angular-runtime-performance',
  imports: [],
  templateUrl: './angular-runtime-performance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularRuntimePerformanceComponent {}
