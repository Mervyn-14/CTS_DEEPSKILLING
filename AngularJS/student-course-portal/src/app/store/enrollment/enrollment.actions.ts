import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction(
  '[Enrollment] Enroll',
  props<{
    courseId: number
  }>()
);

export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll',
  props<{
    courseId: number
  }>()
);
