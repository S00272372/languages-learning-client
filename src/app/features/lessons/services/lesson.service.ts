import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLessonDto, Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/lessons';

  getLessonsByCourse(courseId: string): Observable<Lesson[]> {
    const params = new HttpParams().set('courseId', courseId);
    return this.http.get<Lesson[]>(this.apiUrl, { params });
  }

  addLesson(lesson: CreateLessonDto): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiUrl, lesson);
  }

  deleteLesson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}