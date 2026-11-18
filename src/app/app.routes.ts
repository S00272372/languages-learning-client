import { Routes } from '@angular/router';
import { CourseList } from './features/courses/pages/course-list/course-list';
import { CourseDetails } from './features/courses/pages/course-details/course-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CourseList,
  },
  {
    path: 'courses/:id',
    component: CourseDetails,
  },
];