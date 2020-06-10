import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FilterQuery } from 'src/app/models/filterQuery.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  isShow = false;
  searchForm: FormGroup;
  skills = ['Java', 'Spring', 'Angular', 'HTML', 'Postgres', 'Mockito', 'JUnit'];

  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.constructSearchForm();
  }

  public toggleDisplay() {
    this.isShow = !this.isShow;
  }

  public searchVacancies() {
    const filterQuery: FilterQuery = this.searchForm.value as FilterQuery;
    filterQuery.skills = filterQuery.skills.filter(a => a.selected == true).map(a => {
      return a.name;
    });

    if(!filterQuery.fromDate) filterQuery.fromDate = '';

    if(!filterQuery.toDate) filterQuery.toDate = '';

    console.log(filterQuery);

  }

  public resetForm() {
    this.searchForm.reset(this.constructSearchForm().value);
  }

  private constructSearchForm(): FormGroup {

    const buildSkills = () => {
      const arr = this.skills.map(skill => {
        return this.form.group({
          name: skill,
          selected: false
        });
      });
      return new FormArray(arr);
    }

    return this.form.group({
      city: '',
      skills: buildSkills(),
      distance: '',
      fromDate: '',
      toDate: ''
    });
  }

}
