import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {FormComponent} from './form.component';
import {FormBuilder} from '@angular/forms';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                FormComponent,
                FormBuilder
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
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
                    title: 'vacancy one'
                },
                {
                    id: 2,
                    title: 'vacancy two'
                },
                {
                    id: 3,
                    title: 'vacancy three'
                }
            ]
        };

        // Expect search request to not be triggered yet
        httpTestingController.expectNone(vacanciesUrl);
        expect(component.vacancies.length).toEqual(0);

        // Initialize component
        component.ngOnInit();

        // Expect one search request that should be a POST
        const req = httpTestingController.expectOne(vacanciesUrl);
        expect(req.request.method).toEqual('POST');

        // Respond to search request with mock data
        req.flush(mockVacancies);

        // Expect stored vacancies to now match the mock data
        expect(component.vacancies.length).toEqual(3);
        expect(component.vacancies[0].title).toEqual(mockVacancies.vacancies[0].title);
    });
});
