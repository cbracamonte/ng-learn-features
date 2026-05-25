import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ROUTING_LAB_CONFIG } from './application/routing-lab.tokens';

@Component({
  selector: 'app-routing-advanced',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './routing-advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingAdvancedComponent {
  protected readonly config = inject(ROUTING_LAB_CONFIG);

  protected readonly navItems = [
    {
      label: 'Overview',
      route: './overview',
      description: 'Nested routes, outlet y route config',
    },
    {
      label: 'Params + Query',
      route: './projects/alpha',
      description: 'Route params y query params reactivos',
    },
    {
      label: 'Guarded',
      route: './guarded',
      description: 'Functional guards con providers de ruta',
    },
    {
      label: 'Resolved',
      route: './resolved/beta',
      description: 'ResolveFn antes de activar pantalla',
    },
  ];
}
