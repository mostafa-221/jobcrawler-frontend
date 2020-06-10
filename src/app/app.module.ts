import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { VacancyDetailsComponent } from './components/vacancy-details/vacancy-details.component';
import { ConvertStringToDotsPipe } from './utils/convert-string-to-dots.pipe';
import { MaterialModule } from './material/material.module';
import { VacancyTableComponent } from './components/vacancy-table/vacancy-table.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
    declarations: [
        AppComponent,
        VacancyDetailsComponent,
        ConvertStringToDotsPipe,
        VacancyTableComponent,
        FilterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FlexLayoutModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
