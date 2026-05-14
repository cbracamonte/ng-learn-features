import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeferredContentDemoComponent } from './components/deferred-content-demo/deferred-content-demo.component';

@Component({
  selector: 'app-template-control-flow',
  imports: [RouterLink, DeferredContentDemoComponent],
  templateUrl: './template-control-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateControlFlowComponent {
  protected readonly showSignalBlock = signal(false);
  protected readonly showErrorDemo = signal(false);

  protected enableSignalBlock(): void {
    this.showSignalBlock.set(true);
  }

  protected enableErrorDemo(): void {
    this.showErrorDemo.set(true);
  }
}
