import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ReleaseManagerComponent } from './release-manager.component';
import { ReleaseDetailsComponent } from './release-details/release-details.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  // tslint:disable-next-line:max-line-length
  Shell.childRoutes([
    { path: 'release', component: ReleaseManagerComponent, data: { title: extract('Release Manager') } },
    { path: 'release/:id', component: ReleaseDetailsComponent, data: { title: extract('Release Details') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class ReleaseManagementRoutingModule {}
