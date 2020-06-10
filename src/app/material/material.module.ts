import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'}
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class MaterialModule { }
