import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FilterQuery } from 'src/app/models/filterQuery.model';
import { IVacancies } from 'src/app/models/ivacancies';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [FilterService]
})
export class FilterComponent implements OnInit {

  isShow: boolean = false;
  searchForm: FormGroup;
  // TODO: skills and cities are currently hardcoded but need to be retrieved from the backend at some point
  skills: string[] = ['Angular', 'HTML', 'Java', 'JUnit', 'Mockito', 'Postgres', 'Spring'];
  cities: string[] = ['Amsterdam', 'Den Haag', 'Rotterdam', 'Utrecht'];
  vacancies: IVacancies[] = [];
  filteredCities: Observable<String[]>;
  isLoading: Subject<boolean> = this.loaderService.isLoading;


  /**
   * Creates an instance of filter component.
   * @param form Constructs form
   * @param filterService Used for http requests (post/get)
   * @param loaderService HttpInterceptor
   */
  constructor(private form: FormBuilder,
    private filterService: FilterService,
    private loaderService: LoaderService) { }

  
  /**
   * Function gets executed upon initialization.
   * Constructs searchform.
   * Retrieves all vacancies.
   * Detect changes to 'city' field.
   */
  ngOnInit(): void {
    this.searchForm = this.constructSearchForm();
    this.getAllVacancies();

    this.filteredCities = this.searchForm.get('city')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCity(value))
    );
  }


  /**
   * Filters city
   * @param search entered string
   * @returns matching cities to entered string 
   */
  private _filterCity(search: string): string[] {
      return this.cities.filter(value => value.toLowerCase().indexOf(search.toLowerCase()) === 0);
  }


  /**
   * Toggles display / filter column
   */
  toggleDisplay(): void {
    this.isShow = !this.isShow;
  }


  /**
   * Gets all vacancies
   */
  getAllVacancies(): void {
    this.filterService.showAllVacancies().subscribe((data: any) => {
      data.vacancies.forEach(vacancy => {
        this.vacancies.push({
            title: vacancy.title,
            broker: vacancy.broker,
            postingDate: vacancy.postingDate,
            location: vacancy.location,
            id: vacancy.id,
            vacancyUrl: vacancy.vacancyURL
        });
      });
    });
  }


  /**
   * TODO: Connect this function to send request to backend.  
   * Converts form to json format. Currently logged to console and calls the getAllVacancies() function.
   */
  searchVacancies(): void {
    const filterQuery: FilterQuery = this.searchForm.value as FilterQuery;
    filterQuery.skills = filterQuery.skills.filter(a => a.selected == true).map(a => {
      return a.name;
    });

    if(!filterQuery.fromDate) filterQuery.fromDate = '';

    if(!filterQuery.toDate) filterQuery.toDate = '';

    console.log(filterQuery);

    this.getAllVacancies();

  }


  /**
   * Resets form back to default values
   */
  resetForm(): void {
    this.searchForm.reset(this.constructSearchForm().value);
    this.vacancies = [];
  }


  /**
   * Constructs search form
   * @returns empty search form 
   */
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
      keyword: '',
      city: '',
      skills: buildSkills(),
      distance: '',
      fromDate: '',
      toDate: ''
    });
  }

}
