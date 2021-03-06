import { ReleaseManagementModule } from './release-manager-overview/release-manager-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BuildOverviewModule } from './build-overview/build-overview.module';
import { ApiService } from './services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationService } from './services/notification.service';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    BuildOverviewModule,
    CustomerModule,
    ReleaseManagementModule,
    LoginModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, // must be imported as the last module as it contains the fallback route,
    ReactiveFormsModule,
    NgxChartsModule,
    NgSelectModule
  ],
  declarations: [AppComponent],
  providers: [ApiService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
