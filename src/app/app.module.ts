import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConvertStringToDotsPipe } from './utils/convert-string-to-dots.pipe';
import { MaterialModule } from './material/material.module';
import { VacancyTableComponent } from './components/vacancy-table/vacancy-table.component';
import { FilterComponent } from './components/filter/filter.component';
import { VacancyDialogComponent } from './components/vacancy-dialog/vacancy-dialog.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SkillListComponent } from 'src/app/components/skill-list/skill-list.component';
import { SkillFormComponent } from './components/skill-form/skill-form.component';
import { SkillService } from './services/skill-service.service';


@NgModule({
    declarations: [
        AppComponent,
        ConvertStringToDotsPipe,
        VacancyTableComponent,
        FilterComponent,
        VacancyDialogComponent,
        SkillListComponent,
        SkillFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule
    ],
    providers: [
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        SkillService
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [VacancyDialogComponent]
})
export class AppModule {
}
