import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing'

import {VacancyDetailsComponent} from './vacancy-details.component';
import {ActivatedRoute} from '@angular/router';

describe('VacancyDetailsComponent', () => {
    const routeMock = {snapshot: {params: {id: '1'}}};
    let component: VacancyDetailsComponent;
    let fixture: ComponentFixture<VacancyDetailsComponent>;
    let nativeComponent: HTMLElement;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [VacancyDetailsComponent],
            providers: [
                { provide: ActivatedRoute, useValue: routeMock }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(VacancyDetailsComponent);
        component = fixture.componentInstance;
        nativeComponent = fixture.debugElement.nativeElement;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get vacancy data and display it', () => {
        const id = routeMock.snapshot.params.id;
        const vacancyUrl = 'http://localhost:8080/getByID/' + id;
        const vacancyMock = {
            id: id,
            title: 'Vacancy title'
        }

        // Expect search request to not be triggered yet
        httpTestingController.expectNone(vacancyUrl);
        expect(component.id).toBeUndefined();
        expect(component.vacancy).toBeUndefined();

        // Initialize component
        component.ngOnInit();

        // Expect one search request that should be a GET
        const req = httpTestingController.expectOne(vacancyUrl);
        expect(req.request.method).toEqual('GET');

        // Respond to search request with mock data
        req.flush(vacancyMock);

        // Expect stored id and vacancy to now match the mock data
        expect(component.id).toEqual(id);
        expect(component.vacancy.id).toEqual(vacancyMock.id);
        expect(component.vacancy.title).toEqual(vacancyMock.title);

        // Expect vacancy to be shown only after component has detected changes
        expect(nativeComponent.querySelector('#vacancy')).toBeNull();
        fixture.detectChanges();
        const vacancyElement = nativeComponent.querySelector('#vacancy');
        const vacancyData = nativeComponent.querySelector('#vacancy').children;
        expect(vacancyElement).toBeTruthy();
        expect(vacancyData.length).toEqual(10);
        expect(vacancyData[0].textContent.trim()).toEqual('ID ' + vacancyMock.id);
        expect(vacancyData[2].textContent.trim()).toEqual('Title ' + vacancyMock.title);
    });

    it('should display error', () => {
        const vacancyUrl = 'http://localhost:8080/getByID/' + routeMock.snapshot.params.id;
        const vacancyErrorMock = "Invalid ID";
        const vacancyErrorStatus = { status: 404, statusText: 'Not Found' };

        // Initialize component
        expect(component.errorMSG).toBeUndefined();
        fixture.detectChanges();

        // Expect one search request that should be a GET
        const req = httpTestingController.expectOne(vacancyUrl);
        expect(req.request.method).toEqual('GET');

        // Respond to search request with error
        req.flush(vacancyErrorMock, vacancyErrorStatus);

        // Expect error data to be stored
        expect(component.errorMSG).toEqual(vacancyErrorMock);

        // Expect error to be shown only after component has detected changes
        expect(nativeComponent.querySelector('p')).toBeNull();
        fixture.detectChanges();
        const errorText = nativeComponent.querySelector('p').textContent;
        expect(errorText).toEqual(vacancyErrorMock);
    });
});
