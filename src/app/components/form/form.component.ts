import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogueComponent} from "../dialogue/dialogue.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  public greeting: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public  dialog: MatDialog
  ) { }

  jobForm: FormGroup;

  ngOnInit(): void {
    this.getForm();
  }

  getForm = () =>
    this.jobForm = this.formBuilder.group({
      plaats: '',
      afstand: '',
      sleutelwoorden: ''
    });

  submit = () => {
    const { plaats, afstand, sleutelwoorden } = this.jobForm.value;

    this.dialog.open(DialogueComponent, {
      width: '250px',
      data: { plaats: plaats, animal: afstand, sleutelwoorden: sleutelwoorden }
    });
  };

  getGreeting = () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': 'localhost:8080'
      })
    };

    this.http.get(environment.api + '/greeting?name=Crawler', httpOptions).subscribe((data: any) => this.greeting = data['content'] + ' #' + data['id']);
  };

}
