/*
    Contains the logic to expose the functionality to maintain the skill table
    CRD functionality

    To update a skill name, delete the skill and then update the skill
    Separate form skill-form is available to add a skill

    Skill names are matched with vacancies by the backend ignoring the case 
    (i.e. converted to uppercase and matched with the uppercase of the vacancy text)
    It is therefore not necessary to worry about the case (uppercase or lowercase)

    After addition of skills, it is necessary to relink the skills by pressing the
    relink buttons. The back-end will then create new matching links between the
    skills table and the vacancies table.
*/ 


import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill-service.service'
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
 
  skills: Skill[];
 
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private skillService: SkillService) {
  }
  
  deleteRow(skill: Skill) {
    console.log("delete this row:" + skill.name);
    this.skillService.deleteSkill(skill).subscribe(() => this.gotoSkillListAfterDelete());
  }

  public relinkSkills(): void {
    console.log("relink skills");
    this.skillService.relinkSkills();
  }

  public navigateVacancies(): void {
    this.router.navigate(['']);
  }

  public addSkill(): void {
    this.router.navigate(['addskill']);
  }

  
 
  ngOnInit() {
    this.skillService.findAll().subscribe(data => {
      this.skills = data;
      console.log(data);
    });
  }

  private gotoSkillListAfterDelete(): void {
    console.log("now navigate to list after delete");
    this.skillService.findAll().subscribe((data) => {
      this.skills = data;
    });
  }
}
