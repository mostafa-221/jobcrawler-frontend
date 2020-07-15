import { Vacancy } from './vacancy';

export class Page {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    vacancies: Vacancy[];
}