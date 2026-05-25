import { InjectionToken } from '@angular/core';

export type RoutingLabConfig = {
  featureName: string;
  accessRole: 'student' | 'admin';
  enableResolvedRoute: boolean;
};

export type RoutingProject = {
  id: string;
  title: string;
  owner: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'archived';
};

export const ROUTING_LAB_CONFIG = new InjectionToken<RoutingLabConfig>('ROUTING_LAB_CONFIG');
