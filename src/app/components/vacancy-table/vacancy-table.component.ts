import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vacancy-table',
  templateUrl: './vacancy-table.component.html',
  styleUrls: ['./vacancy-table.component.scss']
})
export class VacancyTableComponent implements OnInit {

  @Input() isShow: boolean;
  @Output() filterButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  resizeFilterClick() {
    this.filterButtonClicked.emit();
  }

}
