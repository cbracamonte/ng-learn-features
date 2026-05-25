import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ROUTING_LAB_CONFIG, RoutingProject } from './routing-lab.tokens';

const PROJECTS: Record<string, RoutingProject> = {
  alpha: {
    id: 'alpha',
    title: 'Migración a standalone routes',
    owner: 'Frontend Platform',
    updatedAt: '2026-05-14',
    status: 'active',
  },
  beta: {
    id: 'beta',
    title: 'Dashboard con guards funcionales',
    owner: 'Learning Team',
    updatedAt: '2026-05-10',
    status: 'paused',
  },
};

export const routingProjectResolver: ResolveFn<RoutingProject> = (route) => {
  const config = inject(ROUTING_LAB_CONFIG);
  const projectId = route.paramMap.get('projectId') ?? 'alpha';
  const project = PROJECTS[projectId] ?? PROJECTS['alpha'];

  return {
    ...project,
    title: `${project.title} · ${config.featureName}`,
  };
};
