import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {FormComponent} from './form.component';
import {FormBuilder} from '@angular/forms';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ConvertStringToDotsPipe} from "../../utils/convert-string-to-dots.pipe";

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let nativeComponent: HTMLElement;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatTableModule,
                MatCardModule
            ],
            declarations: [FormComponent, ConvertStringToDotsPipe],
            providers: [
                FormBuilder
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        nativeComponent = fixture.debugElement.nativeElement;
    }));

    afterEach(async(() => {
        // Verify there are no pending http requests
        httpTestingController.verify();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all vacancies on initialization', () => {
        // Create mock for vacancies http request
        const vacanciesUrl = 'http://localhost:8080/searchrequest';
        const mockVacancies = {
            queries: [null, null, null],
            vacancies: [
                {
                    id: 1,
                    title: 'vacancy one',
                    broker: 'broker',
                    postingDate: 'date',
                    location: 'location',
                    vacancyURL: 'url'
                },
                {
                    id: 2,
                    title: 'vacancy two',
                    broker: 'broker',
                    postingDate: 'date',
                    location: 'location',
                    vacancyURL: 'url'
                },
                {
                    id: 3,
                    title: 'vacancy three',
                    broker: 'broker',
                    postingDate: 'date',
                    location: 'location',
                    vacancyURL: 'url'
                }
            ]
        };

        // Expect search request to not be triggered yet
        httpTestingController.expectNone(vacanciesUrl);
        expect(component.vacancies.length).toEqual(0);

        // Initialize component
        fixture.detectChanges();

        // Expect one search request that should be a POST
        const req = httpTestingController.expectOne(vacanciesUrl);
        expect(req.request.method).toEqual('POST');

        // Respond to search request with mock data
        req.flush(mockVacancies);

        // Expect stored vacancies to now match the mock data
        expect(component.vacancies.length).toEqual(3);
        expect(component.vacancies[0].title).toEqual(mockVacancies.vacancies[0].title);

        // Expect vacancies to be shown only after component has detected changes
        expect(nativeComponent.querySelector('table')).toBeNull();
        fixture.detectChanges();
        const vacanciesTable = nativeComponent.querySelector('table');
        const vacancyTitles = vacanciesTable.children[1].children;
        expect(vacanciesTable).toBeTruthy();
        expect(vacancyTitles.length).toEqual(mockVacancies.vacancies.length);
        expect(vacancyTitles[0].firstChild.textContent.trim()).toEqual(mockVacancies.vacancies[0].title);
    });
});
