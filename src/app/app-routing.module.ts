import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './components/form/form.component';
import {VacancyDetailsComponent} from './components/vacancy-details/vacancy-details.component';

const routes: Routes = [
    {path: '', component: FormComponent},
    {path: 'id/:id', component: VacancyDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
