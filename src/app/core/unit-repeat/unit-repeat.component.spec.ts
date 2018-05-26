import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitRepeatComponent } from './unit-repeat.component';

describe('UnitRepeatComponent', () => {
  let component: UnitRepeatComponent;
  let fixture: ComponentFixture<UnitRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
