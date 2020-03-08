import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ReleaseManagerComponent } from './release-manager.component';

const routes: Routes = [
  // tslint:disable-next-line:max-line-length
  Shell.childRoutes([
    { path: 'release', component: ReleaseManagerComponent, data: { title: extract('Release Manager') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReleaseManagementRoutingModule {}
