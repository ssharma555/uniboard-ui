import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReleaseManagerComponent } from './release-manager.component';
import { ReleaseManagementRoutingModule } from './release-manager-routing-module';
import { ReleaseDetailsComponent } from './release-details/release-details.component';
import { ReleaseAddFormComponent } from './release-add-form/release-add-form.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    ReleaseManagementRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxChartsModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [ReleaseManagerComponent, ReleaseDetailsComponent, ReleaseAddFormComponent],
  entryComponents: [ReleaseAddFormComponent]
})
export class ReleaseManagementModule {}
