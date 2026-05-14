export interface FeatureCard {
  title: string;
  description: string;
  route: string;
  status: 'Activo' | 'Nuevo' | 'Próximamente';
}
