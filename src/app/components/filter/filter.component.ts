import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterQuery } from 'src/app/models/filterQuery.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  isShow = false;
  searchForm: FormGroup;

  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.constructSearchForm();
  }

  public toggleDisplay() {
    this.isShow = !this.isShow;
  }

  public searchVacancies() {
    const filterQuery: FilterQuery = this.searchForm.value as FilterQuery;

    console.log(filterQuery);

  }

  public resetForm() {
    this.searchForm.reset(this.constructSearchForm().value);
  }

  private constructSearchForm(): FormGroup {

    return this.form.group({
      city: ''
    });
  }

}
