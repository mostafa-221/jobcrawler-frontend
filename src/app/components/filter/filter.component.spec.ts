import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Filtering3Component } from './filter.component';

describe('Filtering3Component', () => {
  let component: Filtering3Component;
  let fixture: ComponentFixture<Filtering3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Filtering3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Filtering3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
