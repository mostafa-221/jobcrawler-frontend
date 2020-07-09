import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FilterQuery } from 'src/app/models/filterQuery.model';
import { IVacancies } from 'src/app/models/ivacancies';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'src/app/services/skill-service.service';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [FilterService]
})
export class FilterComponent implements OnInit {

  isShow: boolean = false;
  searchForm: FormGroup;
  skills: string[] = ['Java', 'Spring', 'Angular', 'HTML', 'Postgres', 'Mockito', 'JUnit'];
  vacancies: IVacancies[] = [];
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
    private loaderService: LoaderService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router ) {

    }


  private skillList: Skill[];
  private name: string;


  // does not work (yet) when called from the ngOnInit, probably timing error by creating the screen
  // should fill the skill list at screen start time
  private fillSkillList():void {
      console.log("retrieving skills to fill list on screen");
      this.skillService.findAll().subscribe(data => {
        this.skillList = data;


        for (let i = 0; i < this.skillList.length; i ++) {
          this.name = this.skillList[i].name;
          this.skills.push(this.name);
          console.log("added skill:" + this.name);
        }

        console.log("skills retrieved");
        this.searchForm = this.constructSearchForm();
      });

  }


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
      city: '',
      skills: buildSkills(),
      distance: '',
      fromDate: '',
      toDate: ''
    });
  }

}
