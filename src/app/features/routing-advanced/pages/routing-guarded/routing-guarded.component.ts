import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROUTING_LAB_CONFIG } from '../../application/routing-lab.tokens';

@Component({
  selector: 'app-routing-guarded',
  templateUrl: './routing-guarded.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingGuardedComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly config = inject(ROUTING_LAB_CONFIG);
  protected readonly requiredRole = this.route.snapshot.data['requiredRole'] as string;
}
