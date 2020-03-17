import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    public greeting: string;
    jobForm: FormGroup;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        public  dialog: MatDialog
    ) {
    }

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
        const {plaats, afstand, sleutelwoorden} = this.jobForm.value;

        const body = {
            location: plaats,
            distance: afstand,
            keywords: sleutelwoorden
        };

        this.http.post(environment.api + '/searchrequest', body).subscribe((data: any) => alert(data.texts));
    };

}
