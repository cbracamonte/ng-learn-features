import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { RoutingProject } from '../../application/routing-lab.tokens';

@Component({
  selector: 'app-routing-resolved',
  imports: [RouterLink],
  templateUrl: './routing-resolved.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingResolvedComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly project = toSignal(
    this.route.data.pipe(map((data) => data['project'] as RoutingProject)),
    {
      initialValue: {
        id: 'alpha',
        title: 'Cargando proyecto',
        owner: 'Router',
        updatedAt: '2026-05-14',
        status: 'active',
      },
    },
  );
}
