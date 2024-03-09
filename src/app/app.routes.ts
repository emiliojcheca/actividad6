import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent},
    {
        path: 'home', component: HomeComponent, children: [
            { path: "", component: HomeComponent},
            { path: 'user/:id', component: UserViewComponent}
        ]
    },
    {
        path: '*', redirectTo: 'home'
    }
];
