import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyTableComponent } from './vacancy-table.component';
import { FilterService } from 'src/app/services/filter.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VacancyTableComponent', () => {
  let component: VacancyTableComponent;
  let fixture: ComponentFixture<VacancyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ VacancyTableComponent ],
      providers: [ FilterService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
