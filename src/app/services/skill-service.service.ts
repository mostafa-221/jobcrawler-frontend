import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../models/skill';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    this.skillsUrl = environment.api + '/getskills';
    this.saveSkillUrl = environment.api + '/saveskill';
    this.deleteSkillUrl = environment.api + '/deleteskill';
    this.relinkSkillsUrl = environment.api + '/relinkskills';
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
