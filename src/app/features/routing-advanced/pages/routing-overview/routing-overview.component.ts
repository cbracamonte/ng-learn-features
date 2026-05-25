import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-routing-overview',
  templateUrl: './routing-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingOverviewComponent {
  protected readonly concepts = [
    {
      name: 'children + RouterOutlet',
      explanation: 'Permite layouts persistentes con contenido hijo intercambiable.',
      tradeoff: 'Si anidás sin criterio, la URL deja de contar una historia clara.',
    },
    {
      name: 'loadComponent',
      explanation: 'Carga componentes standalone de forma lazy, sin NgModule ceremonial.',
      tradeoff: 'No uses lazy como excusa para partir features sin boundaries reales.',
    },
    {
      name: 'route providers',
      explanation: 'Crea un EnvironmentInjector hijo para aislar configuración y servicios por feature.',
      tradeoff: 'Poderoso, pero si abusás generás scopes invisibles difíciles de debuggear.',
    },
    {
      name: 'data / title / resolve',
      explanation: 'Adjunta metadata o datos resueltos al ActivatedRoute antes de renderizar.',
      tradeoff: 'Resolvers no son para bloquear toda la UX por datos secundarios.',
    },
  ];
}
