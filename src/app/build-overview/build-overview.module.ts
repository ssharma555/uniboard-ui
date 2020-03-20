import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';

import { BuildOverviewRoutingModule } from './build-overview-routing.module';
import { BuildOverviewComponent } from './build-overview.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    BuildOverviewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BuildOverviewComponent, SearchComponent]
})
export class BuildOverviewModule {}
