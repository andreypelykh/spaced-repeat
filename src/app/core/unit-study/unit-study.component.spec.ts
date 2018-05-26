import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitStudyComponent } from './unit-study.component';

describe('UnitStudyComponent', () => {
  let component: UnitStudyComponent;
  let fixture: ComponentFixture<UnitStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
