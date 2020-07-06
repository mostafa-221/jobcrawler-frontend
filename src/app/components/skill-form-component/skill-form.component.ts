import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from '../../services/skill-service.service';
import { Skill } from '../../models/skill';


@Component({
  selector: 'app-skill-form',
  templateUrl: 'src/app/components/skill-form-component/skill-form-component.ts',
  styleUrls: ['src/app/components.component.css']
})
export class SkillFormComponent {

  skill: Skill;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private skillService: SkillService) {
    this.skill = new Skill();
  }
 
  onSubmit() {
    this.skillService.save(this.skill).subscribe(() => this.gotoSkillListAfterAddition());
  }


  gotoSkillListAfterAddition() {
    this.router.navigate(['getskills']);
  }
}
