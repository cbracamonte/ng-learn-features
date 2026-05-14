import { Component, input, output } from '@angular/core';

type Topic = 'signals' | 'computed' | 'effect';
type ResourceStatus = 'idle' | 'loading' | 'reloading' | 'resolved' | 'error' | 'local';

@Component({
  selector: 'app-resource-demo',
  templateUrl: './resource-demo.component.html',
})
export class ResourceDemoComponent {
  readonly status = input.required<ResourceStatus>();
  readonly isLoading = input.required<boolean>();
  readonly value = input<string | undefined>();
  readonly setTopic = output<Topic>();
}
