import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, ConfirmDialogComponent],
  exports: [LoaderComponent, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
