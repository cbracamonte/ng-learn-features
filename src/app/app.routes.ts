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
    path: '**',
    redirectTo: ''
  }
];
