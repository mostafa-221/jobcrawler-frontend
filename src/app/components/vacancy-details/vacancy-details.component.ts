import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Vacancy} from '../../models/vacancy';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    styleUrls: ['./vacancy-details.component.scss'],
    providers: [FilterService]
})
export class VacancyDetailsComponent implements OnInit {

    errorMSG: string;
    vacancy: Vacancy;
    id: string;

    constructor(private route: ActivatedRoute, 
        private router: Router, 
        private filterService: FilterService) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id; // Need the ID variable if the vacancy is not found
        this.filterService.getByID(this.id).subscribe((data: any) => {
            this.vacancy = data;
        }, err => {
            this.errorMSG = err.error.message;
        });
    }

}
