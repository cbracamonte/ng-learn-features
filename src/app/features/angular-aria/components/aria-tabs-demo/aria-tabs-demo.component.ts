import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';

type AriaTab = 'patterns' | 'keyboard' | 'pitfalls';

@Component({
  selector: 'app-aria-tabs-demo',
  imports: [Tabs, TabList, Tab, TabPanel, TabContent],
  templateUrl: './aria-tabs-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaTabsDemoComponent {
  readonly selectedTab = signal<AriaTab>('patterns');

  setSelectedTab(value: string | undefined): void {
    if (value === 'patterns' || value === 'keyboard' || value === 'pitfalls') {
      this.selectedTab.set(value);
    }
  }
}
