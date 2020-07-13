import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Skill} from 'src/app/models/skill';
import {SkillService} from 'src/app/services/skill-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorCode} from '../../services/errorCode';

/*
*   Adding a skill by name
*
*   Name should be unique, error message is displayed otherwise
*   Name uniqueness check takes place in the back end
*   Front end checks whether the name is actually there and minimum length of 3 characters
* */

@Component({
    selector: 'app-skill-form',
    templateUrl: './skill-form.component.html',
    styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private skillService: SkillService) {
        this.skill = new Skill();
    }

    skill: Skill;
    skillAcceptedBackend = true;

    errorMessage: string;

    public navigateSkillList(): void {
        this.router.navigate(['getskills']);
    }

    public onSubmit(): void {
        this.skillAcceptedBackend = true;
        this.skillService.save(this.skill).subscribe((data: ErrorCode) => {
                if (data.errorCode !== 'OK') {
                    console.log(data.errorCode);
                    this.errorMessage = data.errorCode;
                    this.skillAcceptedBackend = false;
                } else {
                    console.log('successfully saved new skill:' + this.skill.name);
                    this.gotoSkillListAfterAddition();
                }
            },
            err => {
                    if (err instanceof HttpErrorResponse) {
                        console.log('Error adding skill in backend:' + this.skill.name );
                        this.skillAcceptedBackend = false;
                    }
            }
        );
    }


    private gotoSkillListAfterAddition(): void {
        this.router.navigate(['getskills']);
    }
}
