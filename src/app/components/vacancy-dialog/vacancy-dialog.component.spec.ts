import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDialogComponent } from './vacancy-dialog.component';

describe('VacancyDialogComponent', () => {
  let component: VacancyDialogComponent;
  let fixture: ComponentFixture<VacancyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
