import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSecurityDefensesComponent } from './components/angular-security-defenses/angular-security-defenses.component';
import { FrontendSecurityArchitectureComponent } from './components/frontend-security-architecture/frontend-security-architecture.component';
import { SecurityFoundationsComponent } from './components/security-foundations/security-foundations.component';
import { SecurityInterviewChecklistComponent } from './components/security-interview-checklist/security-interview-checklist.component';

@Component({
  selector: 'app-frontend-security',
  imports: [
    RouterLink,
    SecurityFoundationsComponent,
    AngularSecurityDefensesComponent,
    FrontendSecurityArchitectureComponent,
    SecurityInterviewChecklistComponent
  ],
  templateUrl: './frontend-security.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontendSecurityComponent {}
