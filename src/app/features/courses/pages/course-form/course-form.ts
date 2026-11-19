import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCourseDto } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { notBlank } from '../../../../shared/validators/not-blank.validator';

@Component({
  selector: 'app-course-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  readonly id = input<string>(); // optional: present only when editing

  saving = signal(false);
  saveError = signal<string | null>(null);

  readonly levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  courseForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), notBlank]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), notBlank]],
    language: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), notBlank]],
    level: ['', [Validators.required]],
  });
  
  ngOnInit(): void {
    const id = this.id();
    if (!id) return; // adding a new course, nothing to load
    this.courseService.getCourseById(id).subscribe({
      next: (course) =>
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          language: course.language,
          level: course.level,
        }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

  onSubmit(): void {
    const newCourse: CreateCourseDto = this.courseForm.getRawValue();

    this.saving.set(true);
    this.saveError.set(null);
    this.courseForm.disable();

       const id = this.id();
    const request = id
      ? this.courseService.updateCourse(id, newCourse)
      : this.courseService.addCourse(newCourse);

    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newCourse.title} saved`, 'Close', { duration: 10000 });
        console.log('Course saved successfully:', response);
        this.router.navigate(['/courses']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.courseForm.enable();
      },
    });
  }
}