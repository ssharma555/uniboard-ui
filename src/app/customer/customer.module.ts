import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [CustomerRoutingModule],
  declarations: [CustomerComponent]
})
export class CustomerModule {}
