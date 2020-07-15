import { Vacancy } from './vacancy';

export class Page {
    totalVacancies: number;
    totalPages: number;
    currentPage: number;
    content: Vacancy[];
}