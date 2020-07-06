import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../models/skill';
import { Observable } from 'rxjs';


@Injectable()
export class SkillService {

private skillsUrl: string;
private saveSkillUrl: string;
private deleteSkillUrl: string;
private relinkSkillsUrl: string;

private  returnval : Observable<Skill[]>;
private uskills: Skill[];
private    pskills: Observable<Skill[]> ;

  constructor(private http: HttpClient) {
    this.skillsUrl = 'http://localhost:8080/getskills';
    this.saveSkillUrl = 'http://localhost:8080/saveskill';
    this.deleteSkillUrl = 'http://localhost:8080/deleteskill';
    this.relinkSkillsUrl = 'http://localhost:8080/relinkskills';
  }

  public findAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillsUrl);
  }

  public deleteSkill(skill: Skill) {
    console.log("Service: delete skill:" + skill.name);
    return this.http.post<Skill>(this.deleteSkillUrl, skill);
  }

  public relinkSkills() {
    console.log("relinking the skills in the database");
    return this.http.get(this.relinkSkillsUrl).subscribe();
  }

  public save(skill: Skill) {
    console.log("Service: save skill:" + skill.name);
    return this.http.post<Skill>(this.saveSkillUrl, skill);
  }

}
