import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {IVacancies} from '../../models/ivacancies';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    jobForm: FormGroup;

    displayedColumns: string[] = ['title', 'broker', 'location', 'postingDate', 'openVacancyURL'];
    vacancies: IVacancies[] = [];

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        // this.getForm();
        this.submit();
    }

    getForm(): void {
        this.jobForm = this.formBuilder.group({
            plaats: '',
            afstand: '',
            sleutelwoorden: ''
        });
    }

    submit(): void {
        // const {plaats, afstand, sleutelwoorden} = this.jobForm.value;

        // const body = {
        //     location: plaats,
        //     distance: afstand,
        //     keywords: sleutelwoorden
        // };

        const nullBody = {
            location: null,
            distance: null,
            keywords: null
        };

        this.http.post(environment.api + '/searchrequest', nullBody).subscribe((data: any) => {
            data.vacancies.forEach(vacancy => {
                this.vacancies.push({
                    title: vacancy.title,
                    broker: vacancy.broker,
                    postingDate: vacancy.postingDate,
                    location: vacancy.location,
                    url: vacancy.id,
                    vacancyUrl: vacancy.vacancyURL
                });
            });
        });
    }

}
