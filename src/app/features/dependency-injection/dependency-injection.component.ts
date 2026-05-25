import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DI_FEATURE_FLAGS, DI_LEARNING_API_URL } from './application/di.tokens';
import { ComponentScopeDemoComponent } from './components/component-scope-demo/component-scope-demo.component';
import { ProviderPatternsDemoComponent } from './components/provider-patterns-demo/provider-patterns-demo.component';
import { ResolutionRulesDemoComponent } from './components/resolution-rules-demo/resolution-rules-demo.component';
import { RootSingletonDemoComponent } from './components/root-singleton-demo/root-singleton-demo.component';

@Component({
  selector: 'app-dependency-injection',
  imports: [
    RouterLink,
    RootSingletonDemoComponent,
    ComponentScopeDemoComponent,
    ProviderPatternsDemoComponent,
    ResolutionRulesDemoComponent,
  ],
  templateUrl: './dependency-injection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependencyInjectionComponent {
  protected readonly apiUrl = inject(DI_LEARNING_API_URL);
  protected readonly flags = inject(DI_FEATURE_FLAGS);
}
