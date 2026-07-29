import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {

  course?: Course;
  students: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {

    // Fetch course details reactively based on route paramMap
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.courseService.getCourseById(id);
      })
    ).subscribe({
      next: (course) => {
        this.course = course;
      },
      error: (err) => {
        console.error('Error loading course details:', err);
      }
    });

    // Fetch enrolled students reactively using switchMap
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.enrollmentService.getStudentsByCourse(id);
      })
    ).subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (err) => {
        console.error('Error loading enrolled students:', err);
      }
    });

  }

}