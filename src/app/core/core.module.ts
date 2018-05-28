import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShellComponent } from './shell/shell.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnitRepeatComponent } from './unit-repeat/unit-repeat.component';
import { UnitStudyComponent } from './unit-study/unit-study.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SPACED_REPEAT_APP_CONFIG } from '../app.config';
import { AuthService } from './auth.service';
import { UnitStudyService } from './unit-study.service';
import {
  todayStartMs,
  TODAY_START_MS,
  TODAY_END_MS,
  todayEndMs
} from './time.uitils';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(SPACED_REPEAT_APP_CONFIG.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ShellComponent,
    LoginComponent,
    PageNotFoundComponent,
    UnitRepeatComponent,
    UnitStudyComponent
  ],
  exports: [AppRoutingModule],
  providers: [
    AuthService,
    UnitStudyService,
    { provide: TODAY_START_MS, useValue: todayStartMs },
    { provide: TODAY_END_MS, useValue: todayEndMs }
  ]
})
export class CoreModule {}
