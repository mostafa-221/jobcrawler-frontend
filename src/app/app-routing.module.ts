import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacancyDetailsComponent} from './components/vacancy-details/vacancy-details.component';
import { FilterComponent } from './components/filter/filter.component';

const routes: Routes = [
    {path: '', component: FilterComponent},
    {path: 'id/:id', component: VacancyDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
