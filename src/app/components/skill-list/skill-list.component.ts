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
 
  deleteRow(skill: Skill) {
    console.log("delete this row:" + skill.name);
    this.skillService.deleteSkill(skill).subscribe(() => this.gotoSkillListAfterDelete());
  }

  relinkSkills() {
    console.log("relink skills");
    this.skillService.relinkSkills();
  }

  navigateVacancies() {
    this.router.navigate(['']);
  }

  addSkill() {
    this.router.navigate(['addskill']);
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private skillService: SkillService) {
  }
 
  ngOnInit() {
    this.skillService.findAll().subscribe(data => {
      this.skills = data;
      console.log(data);
    });
  }

  gotoSkillListAfterDelete() {
    console.log("now navigate to list after delete");
    this.skillService.findAll().subscribe((data) => {
      this.skills = data;
    });
  }
}
