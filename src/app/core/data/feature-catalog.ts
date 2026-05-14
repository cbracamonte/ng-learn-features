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
];
