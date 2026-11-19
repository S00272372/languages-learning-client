import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { withLoadState } from '../../../../shared/load-state';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard, RouterLink, MatButtonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {
  private courseService = inject(CourseService);

  state = toSignal(withLoadState(this.courseService.getCourses()), { requireSync: true });
}