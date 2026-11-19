import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { LessonList } from './lesson-list';

describe('LessonList', () => {
  let component: LessonList;
  let fixture: ComponentFixture<LessonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonList],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonList);
    fixture.componentRef.setInput('courseId', '1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});