import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchQuery } from 'src/app/models/searchQuery.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({opacity : 1}),
            animate(200)
        ]),
        transition('* => void', [
            animate(200, style({opacity: 0}))
        ])
    ])
]
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
    const searchQuery: SearchQuery = this.searchForm.value as SearchQuery;

    console.log(searchQuery);

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
