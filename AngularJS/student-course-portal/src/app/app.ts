import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { CourseSummaryWidget } from './components/course-summary-widget/course-summary-widget';
import { NotificationComponent } from './components/notification/notification';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Home,
    CourseListComponent,
    StudentProfile,
    CourseSummaryWidget,
    NotificationComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-course-portal');

  constructor(
    public loadingService: LoadingService
  ) {}
}