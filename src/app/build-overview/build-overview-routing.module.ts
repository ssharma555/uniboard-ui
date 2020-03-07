import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { BuildOverviewComponent } from './build-overview.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'build', component: BuildOverviewComponent, data: { title: extract('Build Monitor') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BuildOverviewRoutingModule {}
