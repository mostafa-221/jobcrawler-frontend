import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { IVacancies } from 'src/app/models/ivacancies';

@Component({
  selector: 'app-vacancy-table',
  templateUrl: './vacancy-table.component.html',
  styleUrls: ['./vacancy-table.component.scss'],
  providers: [FilterService]
})
export class VacancyTableComponent implements OnInit, OnChanges {

  @Input() isShow: boolean;
  @Output() filterButtonClicked = new EventEmitter();

  displayedColumns: string[] = ['title', 'broker', 'location', 'postingDate', 'openVacancyURL'];
  vacancies: IVacancies[] = [];
  showClass: string;

  constructor(private filterService: FilterService) {
  }

  ngOnChanges(): void {
    this.showClass = this.isShow ? 'table-container' : 'table-container-with-filter';
  }

  ngOnInit(): void {
    this.getAllVacancies();
  }

  public resizeFilterClick(): void {
    this.filterButtonClicked.emit();
  }

  private getAllVacancies(): void {
    this.filterService.showAllVacancies().subscribe((data: any) => {
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
