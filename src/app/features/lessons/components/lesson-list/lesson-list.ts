import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateLessonDto, Lesson } from '../../models/lesson.model';
import { LessonService } from '../../services/lesson.service';
import { notBlank } from '../../../../shared/validators/not-blank.validator';

@Component({
  selector: 'app-lesson-list',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.scss',
})
export class LessonList implements OnInit {
  private formBuilder = inject(FormBuilder);
  private lessonService = inject(LessonService);

  readonly courseId = input.required<string>();

  lessons = signal<Lesson[]>([]);
  loading = signal(true);
  loadError = signal<string | null>(null);
  saving = signal(false);
  saveError = signal<string | null>(null);

  lessonForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), notBlank]],
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000), notBlank]],
  });

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonService.getLessonsByCourse(this.courseId()).subscribe({
      next: (lessons) => {
        this.lessons.set(lessons);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.loadError.set(err.message);
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    const { title, content } = this.lessonForm.getRawValue();
    const newLesson: CreateLessonDto = { title, content, courseId: this.courseId() };

    this.saving.set(true);
    this.saveError.set(null);
    this.lessonForm.disable();

    this.lessonService.addLesson(newLesson).subscribe({
      next: () => {
        this.saving.set(false);
        this.lessonForm.enable();
        this.lessonForm.reset();
        this.loadLessons();
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.lessonForm.enable();
      },
    });
  }

  deleteLesson(lesson: Lesson): void {
    if (!confirm(`Delete lesson "${lesson.title}"?`)) return;
    this.saveError.set(null);
    this.lessonService.deleteLesson(lesson._id).subscribe({
      next: () => this.loadLessons(),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }
}