import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';

import { BuildOverviewRoutingModule } from './build-overview-routing.module';
import { BuildOverviewComponent } from './build-overview.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, BuildOverviewRoutingModule],
  declarations: [BuildOverviewComponent]
})
export class BuildOverviewModule {}
