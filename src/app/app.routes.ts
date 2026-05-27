import { routingLabAccessGuard, routingLabChildGuard } from './features/routing-advanced/application/routing-lab.guards';
import { routingProjectResolver } from './features/routing-advanced/application/routing-lab.resolvers';
import { ROUTING_LAB_CONFIG } from './features/routing-advanced/application/routing-lab.tokens';
import { DI_FEATURE_FLAGS, DI_LEARNING_API_URL } from './features/dependency-injection/application/di.tokens';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'features/zoneless',
    loadComponent: () => import('./features/zoneless/zoneless.component').then((m) => m.ZonelessComponent)
  },
  {
    path: 'features/signals-api',
    loadComponent: () => import('./features/signals-api/signals-api.component').then((m) => m.SignalsApiComponent)
  },
  {
    path: 'features/rxjs-topic',
    loadComponent: () => import('./features/rxjs-topic/rxjs-topic.component').then((m) => m.RxjsTopicComponent)
  },
  {
    path: 'features/angular-21-plus',
    loadComponent: () => import('./features/angular-21-plus/angular-21-plus.component').then((m) => m.Angular21PlusComponent)
  },
  {
    path: 'features/microfrontends',
    loadComponent: () => import('./features/microfrontends/microfrontends.component').then((m) => m.MicrofrontendsComponent)
  },
  {
    path: 'features/template-control-flow',
    loadComponent: () => import('./features/template-control-flow/template-control-flow.component').then((m) => m.TemplateControlFlowComponent)
  },
  {
    path: 'features/lifecycle-hooks',
    loadComponent: () => import('./features/lifecycle-hooks/lifecycle-hooks.component').then((m) => m.LifecycleHooksComponent)
  },
  {
    path: 'features/angular-aria',
    loadComponent: () => import('./features/angular-aria/angular-aria.component').then((m) => m.AngularAriaComponent)
  },
  {
    path: 'features/dependency-injection',
    providers: [
      { provide: DI_LEARNING_API_URL, useValue: 'https://api.angular-learning.local/di' },
      { provide: DI_FEATURE_FLAGS, useValue: { routeScoped: true, useMocks: true } },
    ],
    loadComponent: () => import('./features/dependency-injection/dependency-injection.component').then((m) => m.DependencyInjectionComponent)
  },
  {
    path: 'features/routing-advanced',
    providers: [
      {
        provide: ROUTING_LAB_CONFIG,
        useValue: { featureName: 'Routing Advanced Lab', accessRole: 'student', enableResolvedRoute: true },
      },
    ],
    canActivateChild: [routingLabChildGuard],
    loadComponent: () => import('./features/routing-advanced/routing-advanced.component').then((m) => m.RoutingAdvancedComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        title: 'Routing avanzado · Overview',
        loadComponent: () => import('./features/routing-advanced/pages/routing-overview/routing-overview.component').then((m) => m.RoutingOverviewComponent),
      },
      {
        path: 'projects/:projectId',
        title: 'Routing avanzado · Params',
        loadComponent: () => import('./features/routing-advanced/pages/routing-params/routing-params.component').then((m) => m.RoutingParamsComponent),
      },
      {
        path: 'guarded',
        title: 'Routing avanzado · Guards',
        canActivate: [routingLabAccessGuard],
        data: { requiredRole: 'student' },
        loadComponent: () => import('./features/routing-advanced/pages/routing-guarded/routing-guarded.component').then((m) => m.RoutingGuardedComponent),
      },
      {
        path: 'resolved/:projectId',
        title: 'Routing avanzado · Resolver',
        resolve: { project: routingProjectResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () => import('./features/routing-advanced/pages/routing-resolved/routing-resolved.component').then((m) => m.RoutingResolvedComponent),
      },
    ],
  },
  {
    path: 'features/frontend-security',
    loadComponent: () => import('./features/frontend-security/frontend-security.component').then((m) => m.FrontendSecurityComponent)
  },
  {
    path: 'features/angular-performance',
    loadComponent: () => import('./features/angular-performance/angular-performance.component').then((m) => m.AngularPerformanceComponent)
  },
  {
    path: 'features/frontend-data-flow',
    loadComponent: () => import('./features/frontend-data-flow/frontend-data-flow.component').then((m) => m.FrontendDataFlowComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
