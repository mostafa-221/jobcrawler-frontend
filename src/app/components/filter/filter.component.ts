import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FilterQuery } from 'src/app/models/filterQuery.model';
import { IVacancies } from 'src/app/models/ivacancies';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { SkillService } from 'src/app/services/skill-service.service';
import { Skill } from 'src/app/models/skill';
import { MatSelect } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [FilterService]
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

  totalVacancies: number = 100;
  pageSize: number = 10;
  currentPage: number = 1;
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
    private filterService: FilterService,
    private loaderService: LoaderService,
    private skillService: SkillService) {}

  /**
   * Function gets executed upon initialization.
   * Constructs searchform.
   * Retrieves all vacancies.
   * Detect changes to 'city' field.
   */
  ngOnInit(): void {
    this.loadForm();

    if (!this.vacancies) {
      this.loadPage(this.pageEvent);
    }
  }


  /**
   * Destroys ngx-mat-select-search upon leaving page
   */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public loadPage(pageEvent?: PageEvent): void {
    // this.onLoadMoreVacancies.emit(pageEvent);
    console.log('test');
    console.log(pageEvent);
  }

  /**
   * Toggles display / filter column
   */
  public toggleDisplay(): void {
    this.isShow = !this.isShow;
  }


  /**
   * Gets all vacancies
   */
  public getAllVacancies(): void {
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
  public searchVacancies(pageEvent?: PageEvent): void {
    const filterQuery: FilterQuery = this.searchForm.value as FilterQuery;

    if (this.skillMultiCtrl.value != null)
      filterQuery.skills = this.skillMultiCtrl.value;

    if(!filterQuery.fromDate) filterQuery.fromDate = '';

    if(!filterQuery.toDate) filterQuery.toDate = '';

    const pageNum = pageEvent ? pageEvent.pageIndex + 1 : 1;
    if (pageEvent) this.pageSize = pageEvent.pageSize;

    console.log(filterQuery);

    // this.getAllVacancies();

    this.vacancies = [];

    this.filterService.getByQuery(filterQuery, pageNum, this.pageSize)
    .pipe(takeUntil(this._onDestroy))
    .subscribe(page => {
      page.content.forEach(vacancy => {
        this.vacancies.push({
            title: vacancy.title,
            broker: vacancy.broker,
            postingDate: vacancy.postingDate,
            location: vacancy.location,
            id: vacancy.id,
            vacancyUrl: vacancy.vacancyURL
        });
      });
      this.totalVacancies = page.totalVacancies;
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
    return this.skillService.findAll().toPromise();
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
