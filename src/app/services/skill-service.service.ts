/*
*  Service to support the Skill table maintenance
* */


import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Skill} from '../models/skill';
import {Observable, Subscription, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import {ErrorCode} from './errorCode';

@Injectable()
export class SkillService {

    private skillsUrl: string;
    private saveSkillUrl: string;
    private deleteSkillUrl: string;
    private relinkSkillsUrl: string;



    constructor(private http: HttpClient) {
        this.skillsUrl = environment.api + '/getskills';
        this.saveSkillUrl = environment.api + '/saveskill';
        this.deleteSkillUrl = environment.api + '/deleteskill';
        
        this.relinkSkillsUrl = environment.api + '/relinkskills';
    }

    // find all skills from the skill table
    public findAll(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.skillsUrl);
    }

    // delete a certain skill by name
    public deleteSkill(skill: Skill): Observable<ErrorCode> {
        console.log('Service: delete skill:' + skill.name);
        return this.http.post<ErrorCode>(this.deleteSkillUrl, skill);
    }

    // delete the current links between skills and vacancies and match again
    public relinkSkills(): Observable<any> {
        console.log('relinking the skills in the database');
        return this.http.get(this.relinkSkillsUrl) ;
    }


    // save a new skill, skill name should not yet exist
    // nb skills should be linked again after this by a call to relinkSkills()
    public save(skill: Skill): Observable<ErrorCode> {
        console.log('Service: save the skill:' + skill.name);
        return this.http.post<ErrorCode>(this.saveSkillUrl, skill);
    }

}
