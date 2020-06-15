import {BrowserModule} from '@angular/platform-browser';
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

@NgModule({
    declarations: [
        AppComponent,
        ConvertStringToDotsPipe,
        VacancyTableComponent,
        FilterComponent,
        VacancyDialogComponent
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
    providers: [
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [VacancyDialogComponent]
})
export class AppModule {
}
