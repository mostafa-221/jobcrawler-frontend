import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterService } from 'src/app/services/filter.service';
import { Vacancy } from 'src/app/models/vacancy';

@Component({
  selector: 'app-vacancy-dialog',
  templateUrl: './vacancy-dialog.component.html',
  styleUrls: ['./vacancy-dialog.component.css'],
  providers: [FilterService]
})
export class VacancyDialogComponent implements OnInit {

  errorMSG: string;
  vacancy: Vacancy;

  constructor(@Inject(MAT_DIALOG_DATA) public vacancyID: string,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.getVacancyDetails(this.vacancyID);
    console.log(this.vacancyID);
  }

  getVacancyDetails(vacancyID: string): void {
    this.filterService.getByID(this.vacancyID).subscribe((data: any) => {
      this.vacancy = data;
  }, err => {
      this.errorMSG = err.error;
  });
  }

}
