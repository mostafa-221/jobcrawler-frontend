import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { IVacancies } from 'src/app/models/ivacancies';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { VacancyDialogComponent } from '../vacancy-dialog/vacancy-dialog.component';

@Component({
  selector: 'app-vacancy-table',
  templateUrl: './vacancy-table.component.html',
  styleUrls: ['./vacancy-table.component.scss'],
  providers: [
    FilterService
  ]
})
export class VacancyTableComponent implements OnInit, OnChanges {

  @Input() isShow: boolean;
  @Input() vacancies: IVacancies[];
  @Output() filterButtonClicked = new EventEmitter();

  vacancyDetailsDialog: MatDialogRef<VacancyDialogComponent>;

  displayedColumns: string[] = ['title', 'broker', 'location', 'postingDate', 'openVacancyURL'];
  showClass: string;

  constructor(private dialog: MatDialog) {
  }

  ngOnChanges(): void {
    this.showClass = this.isShow ? 'table-container' : 'table-container-no-filter';
  }

  ngOnInit(): void {
  }

  resizeFilterClick(): void {
    this.filterButtonClicked.emit();
  }

  openDialog(vacancyID: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = vacancyID;
    this.vacancyDetailsDialog = this.dialog.open(VacancyDialogComponent, dialogConfig);
  }

}