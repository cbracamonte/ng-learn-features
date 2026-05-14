import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURE_CATALOG } from '../core/data/feature-catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  protected readonly features = FEATURE_CATALOG;
}
