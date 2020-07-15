import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterQuery } from '../models/filterQuery.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class FilterService {


    /**
     * Creates an instance of filter service.
     * @param httpClient needed for http requests
     */
    constructor(private httpClient: HttpClient) {
    }


    /**
     * TODO: Add method body
     * Searchs by filter query
     * @param query query that needs to be send to backend
     */
    public searchByFilterQuery(query: FilterQuery) {
    }

    public getByQuery(filterQuery: FilterQuery, pageNum: number, pageSize: number): Observable<any> {
        let params = new HttpParams();
        params = params.append('skills', 'AWS');
        params = params.append('size', String(pageSize));
        params = params.append('page', String(pageNum));

        return this.httpClient.get<any>(environment.api + '/vacancies', {params: params});
    }


    /**
     * Shows all vacancies
     * @returns Observable with vacancies if request is a success
     */
    public showAllVacancies(): Observable<any> {
        const nullBody = {
            location: null,
            distance: null,
            keywords: null
        };
        return this.httpClient.post(environment.api + '/searchrequest', nullBody);
    }


    /**
     * Gets vacancy by id
     * @param id of which vacancy details are requested
     * @returns Observable with vacancy details if success
     */
    public getByID(id: string): Observable<any> {
        return this.httpClient.get(environment.api + '/getByID/' + id);
    }
}