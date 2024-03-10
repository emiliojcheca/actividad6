import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'home'},
    {
        path: 'home', component: HomeComponent, children: [
            { path: "", component: UserListComponent},
            { path: 'user/:id', component: UserViewComponent}
        ]
    },
    {
        path: '**', redirectTo: 'home'
    }
];