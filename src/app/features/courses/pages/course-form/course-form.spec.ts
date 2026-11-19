import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { CourseForm } from './course-form';

describe('CourseForm', () => {
  let component: CourseForm;
  let fixture: ComponentFixture<CourseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseForm],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid when it is empty', () => {
    expect(component.courseForm.valid).toBe(false);
  });

  it('should reject the title "test"', () => {
    component.courseForm.controls.title.setValue('test');
    expect(component.courseForm.controls.title.hasError('forbidden')).toBe(true);
  });
});