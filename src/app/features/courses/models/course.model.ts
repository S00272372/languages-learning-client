export interface Course {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
}
export interface CreateCourseDto {
  title: string;
  description: string;
  language: string;
  level: string;
}
export interface UpdateCourseDto {
  title: string;
  description: string;
  language: string;
  level: string;
}