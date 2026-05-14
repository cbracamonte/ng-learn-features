import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Angular21NotesComponent } from './components/angular-21-notes/angular-21-notes.component';
import { HttpResourceDemoComponent } from './components/http-resource-demo/http-resource-demo.component';
import { SignalFormsDemoComponent } from './components/signal-forms-demo/signal-forms-demo.component';

@Component({
  selector: 'app-angular-21-plus',
  imports: [RouterLink, SignalFormsDemoComponent, HttpResourceDemoComponent, Angular21NotesComponent],
  templateUrl: './angular-21-plus.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular21PlusComponent {}
