import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { CustomerModule } from './customer.module';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'customer',
      component: CustomerComponent,
      data: { title: extract('Customer Overview'), context: extract('customer') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CustomerRoutingModule {}
