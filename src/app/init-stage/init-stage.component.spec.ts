import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitStageComponent } from './init-stage.component';

describe('InitStageComponent', () => {
  let component: InitStageComponent;
  let fixture: ComponentFixture<InitStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
