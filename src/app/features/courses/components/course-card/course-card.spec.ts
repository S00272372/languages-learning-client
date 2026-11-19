import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    fixture.componentRef.setInput('course', {
      _id: '1',
      title: 'Spanish Beginner',
      description: 'A beginner course for learning Spanish.',
      language: 'Spanish',
      level: 'A1',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the course details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Spanish Beginner');
    expect(compiled.textContent).toContain('Spanish - Level A1');
  });
});