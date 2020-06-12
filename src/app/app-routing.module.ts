import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';

const routes: Routes = [
    {path: '', component: FilterComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
