import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Vacancy} from '../../models/vacancy';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {

    errorMSG: string;
    vacancy: Vacancy;
    id: string;
    err: Boolean;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id; // Need the ID variable if the vacancy is not found
        this.http.get(environment.api + '/getByID/' + this.id).subscribe((data: any) => {
            this.vacancy = data;
        }, err => {
            this.errorMSG = err.error;
            this.err = true;
        });
    }

}
