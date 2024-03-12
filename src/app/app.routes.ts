import { Routes } from '@angular/router';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: UserListComponent },
    { path: "user/:id", component: UserViewComponent },
    { path: "new/user", component: UserFormComponent },
    { path: "update/user/:id", component: UserFormComponent }
  ];