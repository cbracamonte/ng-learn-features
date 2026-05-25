import { InjectionToken } from '@angular/core';

export type DiFeatureFlags = {
  routeScoped: boolean;
  useMocks: boolean;
};

export const DI_LEARNING_API_URL = new InjectionToken<string>('DI_LEARNING_API_URL');

export const DI_FEATURE_FLAGS = new InjectionToken<DiFeatureFlags>('DI_FEATURE_FLAGS');

export const DI_FLOWER = new InjectionToken<string>('DI_FLOWER', {
  providedIn: 'root',
  factory: () => '🌺 root provider',
});

export const DI_ANIMAL = new InjectionToken<string>('DI_ANIMAL', {
  providedIn: 'root',
  factory: () => '🐳 root provider',
});
