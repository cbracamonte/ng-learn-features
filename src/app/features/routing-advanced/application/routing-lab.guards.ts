import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { ROUTING_LAB_CONFIG } from './routing-lab.tokens';

export const routingLabChildGuard: CanActivateChildFn = () => {
  const config = inject(ROUTING_LAB_CONFIG);
  return config.accessRole === 'student' || config.accessRole === 'admin';
};

export const routingLabAccessGuard: CanActivateFn = () => {
  const config = inject(ROUTING_LAB_CONFIG);
  const router = inject(Router);

  if (config.accessRole === 'student' || config.accessRole === 'admin') {
    return true;
  }

  return router.parseUrl('/features/routing-advanced/overview');
};
