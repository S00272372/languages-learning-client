export interface Lesson {
  _id: string;
  title: string;
  content: string;
  courseId: string;
}

export interface CreateLessonDto {
  title: string;
  content: string;
  courseId: string;
}