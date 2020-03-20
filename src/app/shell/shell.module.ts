import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { ShellComponent } from './shell.component';
import { SearchComponent } from '../build-overview/search/search.component';
import { ReactiveFormsModule, ControlContainer, FormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, RouterModule, ReactiveFormsModule],
  declarations: [ShellComponent, FeedbackComponent],
  entryComponents: [FeedbackComponent]
})
export class ShellModule {}
