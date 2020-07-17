import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FilterQuery } from 'src/app/models/filterQuery.model';
import { IVacancies } from 'src/app/models/ivacancies';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { Skill } from 'src/app/models/skill';
import { MatSelect } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';
import { PageResult } from 'src/app/models/pageresult.model';
import { Vacancy } from 'src/app/models/vacancy';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [HttpService]
})
export class FilterComponent implements OnInit, OnDestroy {

  isShow: boolean = false;
  searchForm: FormGroup;
  skills: string[];
  vacancies: IVacancies[] = [];
  cities: string[] = ['Amsterdam', 'Den Haag', 'Rotterdam', 'Utrecht'];
  showForm: boolean = false;
  filteredCities: Observable<String[]>;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  totalVacancies: number;
  pageSize: number = 15;
  currentPage: number;
  pageEvent: PageEvent;

  public skillMultiCtrl: FormControl = new FormControl();
  public skillMultiFilterCtrl: FormControl = new FormControl();
  public filteredSkillsMulti: ReplaySubject<String[]> = new ReplaySubject<String[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect;


  /**
   * Creates an instance of filter component.
   * @param form Constructs form
   * @param filterService Used for http requests (post/get)
   * @param loaderService HttpInterceptor
   */
  constructor(private form: FormBuilder,
    private httpService: HttpService,
    private loaderService: LoaderService) {}

  /**
   * Function gets executed upon initialization.
   * Constructs searchform.
   * Retrieves all vacancies.
   * Detect changes to 'city' field.
   */
  ngOnInit(): void {
    // this.loadForm();

    this.searchVacancies(this.pageEvent);
  }


  /**
   * Destroys ngx-mat-select-search upon leaving page
   */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Toggles display / filter column
   */
  public toggleDisplay(): void {
    this.isShow = !this.isShow;
  }


  /**
   * TODO: Connect this function to send request to backend.
   * Converts form to json format. Currently logged to console and calls the getAllVacancies() function.
   */
  public searchVacancies(pageEvent?: PageEvent): void {
    let filterQuery: FilterQuery;

    if(this.searchForm !== undefined) {
      filterQuery = this.searchForm.value as FilterQuery;

      if (this.skillMultiCtrl.value != null)
        filterQuery.skills = this.skillMultiCtrl.value;

      if(!filterQuery.fromDate) filterQuery.fromDate = '';

      if(!filterQuery.toDate) filterQuery.toDate = '';
    } else {
      this.isShow = true;
      filterQuery = new FilterQuery();
      filterQuery.city = '';
      filterQuery.distance = 0;
      filterQuery.fromDate = '';
      filterQuery.toDate = '';
      filterQuery.keyword = '';
      filterQuery.skills = [];
    }
    console.log(filterQuery);

    const pageNum = pageEvent ? pageEvent.pageIndex : 0;
    if (pageEvent) this.pageSize = pageEvent.pageSize;

    this.vacancies = [];
    this.httpService.getByQuery(filterQuery, pageNum, this.pageSize)
    .pipe(takeUntil(this._onDestroy))
    .subscribe((page: PageResult) => {
      page.vacancies.forEach((vacancy: Vacancy) => {
        this.vacancies.push({
            title: vacancy.title,
            broker: vacancy.broker,
            postingDate: vacancy.postingDate,
            location: vacancy.location,
            id: vacancy.id,
            vacancyUrl: vacancy.vacancyURL
        });
      });
      this.totalVacancies = page.totalItems;
      this.currentPage = pageNum;
    });

  }

  /**
   * Resets form back to default values
   */
  public resetForm(): void {
    this.searchForm.reset(this.constructSearchForm());
    this.skillMultiCtrl.reset();
    this.vacancies = [];
  }


  /**
   * Loads form asynchronous
   */
  private loadForm(): void {
    this.getSkills().then((data: Skill[]) => {
      let skillData = [];
      data.forEach((skill: Skill) => {
        skillData.push(skill.name);
      });
      this.skills = skillData;
      this.filteredSkillsMulti.next(this.skills.slice());
      this.constructSearchForm().then(() => {
        this.showForm = true;
      });
    });
  }


  /**
   * Gets skills
   * @returns skills as Promise
   */
  private getSkills(): Promise<any> {
    return this.httpService.findAllSkills().toPromise();
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
   * Constructs search form
   * @returns empty search form
   */
  private constructSearchForm(): Promise<any> {
    return new Promise((resolve) => {
      this.searchForm = this.form.group({
        keyword: '',
        city: '',
        skills: '',
        distance: '',
        fromDate: '',
        toDate: ''
      });

      this.filteredCities = this.searchForm.get('city')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCity(value || ''))
        );

      this.skillMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSkillsMulti();
      });

      resolve();
    });
  }


  /**
   * Easily search and select skills
   * @returns Does not return anything, prevent method to continue 
   */
  private filterSkillsMulti(): any {
    if (!this.skills) {
      return;
    }
    
    let search = this.skillMultiFilterCtrl.value;
    if (!search) {
      this.filteredSkillsMulti.next(this.skills.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredSkillsMulti.next(
      this.skills.filter(skill => skill.toLowerCase().indexOf(search) === 0)
    )
  }

}
