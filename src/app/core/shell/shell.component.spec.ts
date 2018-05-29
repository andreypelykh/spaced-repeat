import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material';
import { CoreModule } from '../core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../app-routing/app-routing.module';
import { UnitRepeatComponent } from '../unit-repeat/unit-repeat.component';
import { UnitStudyComponent } from '../unit-study/unit-study.component';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AngularFireAuthMock } from '../auth.service.spec';
import { AngularFireAuth } from 'angularfire2/auth';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShellComponent,
        UnitRepeatComponent,
        UnitStudyComponent,
        LoginComponent,
        PageNotFoundComponent
      ],
      imports: [SharedModule, RouterTestingModule.withRoutes(appRoutes)],
      providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
