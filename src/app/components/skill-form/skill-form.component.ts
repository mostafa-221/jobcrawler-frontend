import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill-service.service';


@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent {

  skill: Skill;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private skillService: SkillService) {
    this.skill = new Skill();
  }
 
  navigateSkillList() {
    console.log("back to skill list");
    this.router.navigate(['getskills']);
  }

  onSubmit() {
    this.skillService.save(this.skill).subscribe(() => this.gotoSkillListAfterAddition());
  }


  gotoSkillListAfterAddition() {
    this.router.navigate(['getskills']);
  }
}
