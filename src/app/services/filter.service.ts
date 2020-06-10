import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FilterQuery } from '../models/filterQuery.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class FilterService {

    constructor(private httpClient: HttpClient) {
    }

    public searchByFilterQuery(query: FilterQuery) {
    }

    public showAllVacancies() {
        const nullBody = {
            location: null,
            distance: null,
            keywords: null
        };
        return this.httpClient.post(environment.api + '/searchrequest', nullBody);
    }
}