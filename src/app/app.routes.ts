import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { isAuthGuard } from './Core/guards/is-auth.guard';
import { Home } from './Pages/home/home';

export const routes: Routes = [

    {
        path: 'home',
     component: Home,
    },
    {
        path: 'projects/:slug',
        loadComponent: () => import('./Pages/projects/project-details/project-details').then(m => m.ProjectDetails),
    },
    {
        path: 'login',
        loadComponent: () => import('./Pages/Auth/login/login').then(m => m.Login),
        canActivate: [isAuthGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
