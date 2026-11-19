import { Component, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { MatButtonModule } from '@angular/material/button';
import { LessonList } from '../../../lessons/components/lesson-list/lesson-list';

@Component({
  selector: 'app-course-details',
  imports: [RouterLink, MatButtonModule, LessonList],
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss',
})
export class CourseDetails {
  private courseService = inject(CourseService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly initial: LoadState<Course> = { status: 'loading' };

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.courseService.getCourseById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteCourse(course: Course): void {
    if (!confirm(`Delete ${course.title}? Its lessons will be deleted too.`)) return;
    this.deleting.set(true);
    this.deleteError.set(null);
    this.courseService.deleteCourse(course._id).subscribe({
      next: () => this.router.navigate(['/courses']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
}