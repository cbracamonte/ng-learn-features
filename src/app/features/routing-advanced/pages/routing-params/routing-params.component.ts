import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-routing-params',
  imports: [RouterLink],
  templateUrl: './routing-params.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingParamsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly projectId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('projectId') ?? 'alpha')),
    { initialValue: 'alpha' },
  );

  protected readonly queryState = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => ({
        tab: params.get('tab') ?? 'summary',
        sort: params.get('sort') ?? 'recent',
      })),
    ),
    { initialValue: { tab: 'summary', sort: 'recent' } },
  );

  protected readonly urlState = computed(
    () => `/projects/${this.projectId()}?tab=${this.queryState().tab}&sort=${this.queryState().sort}`,
  );

  updateQuery(tab: string, sort: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab, sort },
      queryParamsHandling: 'merge',
    });
  }
}
