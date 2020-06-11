import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FilterQuery } from '../models/filterQuery.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class FilterService {

    constructor(private httpClient: HttpClient) {
    }

    public searchByFilterQuery(query: FilterQuery) {
    }

    showAllVacancies(): Observable<any> {
        const nullBody = {
            location: null,
            distance: null,
            keywords: null
        };
        return this.httpClient.post(environment.api + '/searchrequest', nullBody);
    }
}