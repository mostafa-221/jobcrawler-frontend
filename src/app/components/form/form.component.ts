import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {IVacancies} from '../../ivacancies';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    public greeting: string;
    jobForm: FormGroup;
    submitted = false;

    displayedColumns: string[] = ['title', 'broker', 'location', 'postingDate', 'openVacancyURL'];
    dataSource: any;
    ELEMENT_DATA: IVacancies[] = [];

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.getForm();
    }

    getForm = () =>
        this.jobForm = this.formBuilder.group({
            plaats: '',
            afstand: '',
            sleutelwoorden: ''
        })

    submit: void {
        this.submitted = true;
        const {plaats, afstand, sleutelwoorden} = this.jobForm.value;

        const body = {
            location: plaats,
            distance: afstand,
            keywords: sleutelwoorden
        };

        // this.http.post(environment.api + '/searchrequest', body).subscribe((data: any) => {
        this.http.get(environment.api + '/getAllJobs').subscribe((data: any) => {
            console.log(data);
            data.forEach(val => {
               this.ELEMENT_DATA.push({
                   title: val.title,
                   broker: val.broker,
                   postingDate: val.postingDate,
                   location: val.location,
                   url: val.id,
                   vacancyUrl: val.vacancyURL
               });
            });
            this.dataSource = this.ELEMENT_DATA;
        });
        this.submitted = false;
    }

}
