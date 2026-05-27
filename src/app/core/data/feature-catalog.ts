import { FeatureCard } from '../models/feature-card.model';

export const FEATURE_CATALOG: FeatureCard[] = [
  {
    title: 'Zoneless',
    description: 'Demo real de Angular sin Zone.js, usando señales para actualización reactiva.',
    route: '/features/zoneless',
    status: 'Activo'
  },
  {
    title: 'Signals API',
    description: 'signal, computed, effect, linkedSignal y resource con ejemplos prácticos separados.',
    route: '/features/signals-api',
    status: 'Nuevo'
  },
  {
    title: 'RxJS',
    description: 'Animaciones prácticas para map operators, pipes y composición de streams (forkJoin/combineLatest).',
    route: '/features/rxjs-topic',
    status: 'Nuevo'
  },
  {
    title: 'Angular 21+ APIs',
    description: 'Signal Forms, httpResource y criterios senior para adoptar APIs modernas sin anti patrones.',
    route: '/features/angular-21-plus',
    status: 'Nuevo'
  },
  {
    title: 'Microfrontends',
    description: 'Comparativa entre Native Federation y Webpack Module Federation con tradeoffs, notas y anti patrones.',
    route: '/features/microfrontends',
    status: 'Nuevo'
  },
  {
    title: 'Template Control Flow',
    description: 'Ejemplos concretos de @defer, @placeholder, @loading, @error y control flow moderno en templates.',
    route: '/features/template-control-flow',
    status: 'Nuevo'
  },
  {
    title: 'Lifecycle Hooks',
    description: 'Legacy hooks y nuevas APIs de render: afterNextRender, afterEveryRender, afterRenderEffect y AfterRenderOptions.',
    route: '/features/lifecycle-hooks',
    status: 'Nuevo'
  },
  {
    title: 'Angular Aria',
    description: 'Directivas headless para patrones WAI-ARIA: accordion, tabs, teclado, foco y screen readers.',
    route: '/features/angular-aria',
    status: 'Nuevo'
  },
  {
    title: 'Dependency Injection',
    description: 'Injectors, providers, InjectionToken, scopes por ruta/componente y resolución jerárquica.',
    route: '/features/dependency-injection',
    status: 'Nuevo'
  },
  {
    title: 'Routing Avanzado',
    description: 'Nested routes, params, query params, guards funcionales, resolvers y providers por ruta.',
    route: '/features/routing-advanced',
    status: 'Nuevo'
  },
  {
    title: 'Frontend + Angular Security',
    description: 'XSS, XSRF, CSP, Trusted Types, sesiones, autorización, supply chain y checklist Senior.',
    route: '/features/frontend-security',
    status: 'Nuevo'
  },
  {
    title: 'Angular Performance',
    description: 'Core Web Vitals, lazy/defer, imágenes, render, zoneless, hidratación, profiling y checklist Senior.',
    route: '/features/angular-performance',
    status: 'Nuevo'
  },
  {
    title: 'Frontend Data Flow',
    description: 'HTTP, contratos API, interceptors, estado remoto, caché, concurrencia, SSR y testing con Angular.',
    route: '/features/frontend-data-flow',
    status: 'Nuevo'
  },
];
