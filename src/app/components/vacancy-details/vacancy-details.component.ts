import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Vacancy } from '../../vacancy';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {

    errorMSG: string;
    vacancy: Vacancy;
    id: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  this.id = this.route.snapshot.params.id;
  this.http.get(environment.api + '/getByID/' + this.route.snapshot.params.id).subscribe((data: any) => {
       console.log(data);
       this.vacancy = data;
    }, err => {
        this.errorMSG = err.error.message;
    });
  }

  index() {
      this.router.navigate(['']);
  }

}
