import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RxjsExhaustMapDemoComponent } from './components/rxjs-exhaust-map-demo/rxjs-exhaust-map-demo.component';
import { RxjsJoinOperatorsDemoComponent } from './components/rxjs-join-operators-demo/rxjs-join-operators-demo.component';
import { RxjsNotesComponent } from './components/rxjs-notes/rxjs-notes.component';
import { RxjsShareReplayDemoComponent } from './components/rxjs-share-replay-demo/rxjs-share-replay-demo.component';
import { RxjsOperatorMappingDemoComponent } from './components/rxjs-operator-mapping-demo/rxjs-operator-mapping-demo.component';
import { RxjsPipeOperatorsDemoComponent } from './components/rxjs-pipe-operators-demo/rxjs-pipe-operators-demo.component';

@Component({
  selector: 'app-rxjs-topic',
  imports: [
    RouterLink,
    RxjsOperatorMappingDemoComponent,
    RxjsExhaustMapDemoComponent,
    RxjsPipeOperatorsDemoComponent,
    RxjsJoinOperatorsDemoComponent,
    RxjsShareReplayDemoComponent,
    RxjsNotesComponent,
  ],
  templateUrl: './rxjs-topic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsTopicComponent {}
