import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StudentProfile } from './student-profile';
import { CourseService } from '../../services/course.service';

describe('StudentProfile', () => {
  let component: StudentProfile;
  let fixture: ComponentFixture<StudentProfile>;

  const initialState = {
    course: {
      courses: [],
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: [],
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfile, HttpClientTestingModule],
      providers: [
        CourseService,
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
