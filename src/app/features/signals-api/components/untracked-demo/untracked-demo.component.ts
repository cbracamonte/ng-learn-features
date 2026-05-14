import { Component, computed, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-untracked-demo',
  templateUrl: './untracked-demo.component.html'
})
export class UntrackedDemoComponent {
  readonly query = signal('angular');
  readonly selectedCategory = signal<'all' | 'frontend' | 'backend'>('all');

  readonly trackedLabel = computed(() => {
    const category = this.selectedCategory();
    const q = this.query();
    return `tracked => category: ${category} | query: ${q}`;
  });

  readonly untrackedLabel = computed(() => {
    const category = this.selectedCategory();
     const q = untracked(() => this.query());
    return `untracked => category: ${category} | query snapshot: ${q}`;
  });

  setQuery(value: string): void {
    this.query.set(value);
  }

  setCategory(value: 'all' | 'frontend' | 'backend'): void {
    this.selectedCategory.set(value);
  }
}
