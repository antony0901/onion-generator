import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import * as AppRouting from "./feature.routing";

import { HomeComponent } from "./home/home.component";
import { SampleComponent } from "./sample/sample.component";

@NgModule({
  declarations: [
    HomeComponent,
    SampleComponent
  ],
  imports: [
    RouterModule.forChild(AppRouting.routes)
  ]
})

export class FeatureModule { }