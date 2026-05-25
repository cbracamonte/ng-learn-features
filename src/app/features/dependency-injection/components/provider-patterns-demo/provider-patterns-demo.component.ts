import { ChangeDetectionStrategy, Component } from '@angular/core';

type ProviderPattern = {
  name: string;
  summary: string;
  useCase: string;
  warning: string;
};

@Component({
  selector: 'app-provider-patterns-demo',
  templateUrl: './provider-patterns-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderPatternsDemoComponent {
  protected readonly patterns: ProviderPattern[] = [
    {
      name: 'useClass',
      summary: 'Cuando el token se resuelve creando una clase concreta.',
      useCase: 'Cambiar implementación real por mock, adapter o variante especializada.',
      warning: 'Si registrás una clase distinta por accidente, podés romper identidad de instancia.',
    },
    {
      name: 'useValue',
      summary: 'Cuando querés proveer un objeto, string, config o feature flag ya construido.',
      useCase: 'Config por ambiente, tokens de API, flags o constantes.',
      warning: 'Cuidá mutabilidad: un objeto compartido puede ser modificado por cualquiera que lo inyecte.',
    },
    {
      name: 'useFactory',
      summary: 'Cuando el valor depende de otra dependencia o de lógica de creación.',
      useCase: 'Construir clientes, configs derivadas, adapters condicionados por flags.',
      warning: 'No metas lógica pesada: la factory corre al resolver el provider.',
    },
    {
      name: 'useExisting',
      summary: 'Cuando dos tokens deben apuntar a la MISMA instancia.',
      useCase: 'Alias de interfaces/tokens sin duplicar services.',
      warning: 'No lo confundas con useClass: useClass crea otra instancia, useExisting reutiliza.',
    },
  ];
}
