import { Routes } from '@angular/router';
import { TasksListing } from './pages/tasks/listing/listing';
import { TasksForm } from './pages/tasks/form/form';

export const routes: Routes = [
    {
        path: 'tasks',
        children: [
            {
                path: '',
                component: TasksListing
            },
            {
                path: 'new',
                component: TasksForm
            },
            {
                path: 'edit/:id',
                component: TasksForm
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'tasks'
    }
];
