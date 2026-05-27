import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularLoadingPerformanceComponent } from './components/angular-loading-performance/angular-loading-performance.component';
import { AngularRuntimePerformanceComponent } from './components/angular-runtime-performance/angular-runtime-performance.component';
import { PerformanceFoundationsComponent } from './components/performance-foundations/performance-foundations.component';
import { PerformanceInterviewChecklistComponent } from './components/performance-interview-checklist/performance-interview-checklist.component';

@Component({
  selector: 'app-angular-performance',
  imports: [
    RouterLink,
    PerformanceFoundationsComponent,
    AngularLoadingPerformanceComponent,
    AngularRuntimePerformanceComponent,
    PerformanceInterviewChecklistComponent
  ],
  templateUrl: './angular-performance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularPerformanceComponent {}
