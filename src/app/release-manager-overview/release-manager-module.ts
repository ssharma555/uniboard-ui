import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReleaseManagerComponent } from './release-manager.component';
import { ReleaseManagementRoutingModule } from './release-manager-routing-module';
import { ReleaseDetailsComponent } from './release-details/release-details.component';
import { ReleaseAddFormComponent } from './release-add-form/release-add-form.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ReleaseManagementRoutingModule
  ],
  declarations: [ReleaseManagerComponent, ReleaseDetailsComponent, ReleaseAddFormComponent],
  entryComponents: [ReleaseAddFormComponent]
})
export class ReleaseManagementModule {}
