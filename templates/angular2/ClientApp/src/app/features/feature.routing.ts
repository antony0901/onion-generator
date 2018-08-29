import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SampleComponent } from './sample/sample.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sample', component: SampleComponent },
];

