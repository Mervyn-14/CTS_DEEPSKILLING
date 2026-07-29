import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { StudentProfile } from './pages/student-profile/student-profile';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { CourseListComponent } from './pages/course-list/course-list';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    {
        path: '',
        component: Home
    },

    {
        path: 'profile',
        canActivate: [authGuard],
        component: StudentProfile
    },

    {
        path: 'courses',
        component: CoursesLayoutComponent,

        children: [

            {
                path: '',
                component: CourseListComponent
            },

            {
                path: ':id',
                component: CourseDetailComponent
            }

        ]

    },

    // Lazy load enrollment routes
    {
        path: 'enroll',
        loadChildren: () =>
            import('./features/enrollment/enrollment.routes')
                .then(m => m.ENROLLMENT_ROUTES)
    },

    {
        path: '**',
        component: NotFound
    }

];