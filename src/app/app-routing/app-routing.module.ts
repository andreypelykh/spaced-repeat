import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../core/login/login.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { ShellComponent } from '../core/shell/shell.component';
import { UnitRepeatComponent } from '../core/unit-repeat/unit-repeat.component';
import { UnitStudyComponent } from '../core/unit-study/unit-study.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'repeat',
        component: UnitRepeatComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'study',
        component: UnitStudyComponent,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: '/repeat', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
