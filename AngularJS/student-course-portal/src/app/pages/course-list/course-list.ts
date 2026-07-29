import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCardComponent
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  selectedCourseId = 0;
  searchTerm = '';

  newCourse: Omit<Course, 'id'> = {
    name: 'Spring Boot',
    code: 'SB101',
    credits: 4,
    gradeStatus: 'pending'
  };

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    this.store.dispatch(CourseActions.loadCourses());
  }

  addCourse() {
    this.courseService
      .createCourse(this.newCourse)
      .subscribe(() => {
        this.ngOnInit();
        // Reset course inputs
        this.newCourse = {
          name: '',
          code: '',
          credits: 3,
          gradeStatus: 'pending'
        };
      });
  }

  delete(id: number) {
    this.courseService
      .deleteCourse(id)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onEnroll(courseId: number) {
    console.log("Enrolling in course : " + courseId);
    this.selectedCourseId = courseId;
  }

  goToCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  searchCourse() {
    this.router.navigate(
      ['courses'],
      {
        queryParams: {
          search: this.searchTerm
        }
      }
    );
  }

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }
}